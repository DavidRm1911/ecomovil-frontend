import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {SignUpRequest} from "../model/sign-up.request";
import {SignInRequest} from "../model/sign-in.request";
import {SignInResponse} from "../model/sign-in.response";
import {ProfileApiService} from '../../users/ProfileAcquirers/services/profile-api.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public id: number = 0;
  public i: number = 0;
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router,
              private http: HttpClient,
              private profileApiService: ProfileApiService) {
    const token = localStorage.getItem('token');
    this.signedIn.next(!!token); // si hay token al iniciar, estás "logueado"
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  signUp(request: SignUpRequest): Observable<any> {
    return this.http.post(`${this.basePath}/authentication/sign-up`, request, this.httpOptions);  }

  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    console.log('entra al sign in');
    return this.http.post<SignInResponse>(
      `${this.basePath}/authentication/sign-in`,
      signInRequest,
      this.httpOptions
    ).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.signedIn.next(true);
        this.signedInUserId.next(response.id);
        this.signedInUsername.next(response.username);
      })
    );
  }

  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then();
  }
}
