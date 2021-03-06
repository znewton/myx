import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from 'config/firebase.config';

type AuthListener = (user: firebase.User | null) => void;

export enum AuthErrorType {
  EMAIL,
  PASSWORD,
  CONFIRMEDPASSWORD,
}
export interface AuthErrorMessage {
  type: AuthErrorType;
  message: string;
}

class Authenticator {
  private authListeners: Array<AuthListener> = [];

  public init() {
    firebase.initializeApp(FirebaseConfig);
    firebase
      .auth()
      .onAuthStateChanged(user => this.handleAuthStateChanged(user));
  }

  private handleAuthStateChanged(user: firebase.User | null) {
    console.log(user, this.authListeners);
    this.authListeners.forEach(listener => listener(user));
  }

  public addAuthListener(listener: AuthListener) {
    const index = this.authListeners.indexOf(listener);
    const removeListener = () => this.authListeners.splice(index, 1);
    if (index > -1) return removeListener;
    this.authListeners.push(listener);
    return removeListener;
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<null | AuthErrorMessage> {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      if (!err.code && !err.message) throw err;
      switch (err.code) {
        case 'auth/invalid-email':
          return {
            type: AuthErrorType.EMAIL,
            message: 'Invalid email address.',
          };
        case 'auth/user-disabled':
          return {
            type: AuthErrorType.EMAIL,
            message: 'The user for this email address has been disabled.',
          };
        case 'auth/user-not-found':
          return {
            type: AuthErrorType.EMAIL,
            message: 'No user found with this email address.',
          };
        case 'auth/wrong-password':
          return {
            type: AuthErrorType.PASSWORD,
            message: 'Incorrect password.',
          };
        default:
          return { type: AuthErrorType.EMAIL, message: err.message };
      }
    }
    return null;
  }

  public async signUp(
    email: string,
    password: string,
    confirmedPassword: string
  ): Promise<null | AuthErrorMessage> {
    if (password !== confirmedPassword) {
      return {
        type: AuthErrorType.CONFIRMEDPASSWORD,
        message: 'Must match password.',
      };
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      if (!err.code && !err.message) throw err;
      switch (err.code) {
        case 'auth/invalid-email':
          return {
            type: AuthErrorType.EMAIL,
            message: 'Invalid email address.',
          };
        case 'auth/email-already-in-use':
          return {
            type: AuthErrorType.EMAIL,
            message: 'There is an existing user with this email address.',
          };
        case 'auth/weak-password':
          return {
            type: AuthErrorType.PASSWORD,
            message: 'Password is too weak.',
          };
          break;
        default:
          return { type: AuthErrorType.EMAIL, message: err.message };
      }
    }
    return null;
  }

  public async signOut() {
    return firebase.auth().signOut();
  }
}

export default new Authenticator();
