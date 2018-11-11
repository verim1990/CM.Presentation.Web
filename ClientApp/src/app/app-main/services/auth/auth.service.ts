import { Observable } from 'rxjs';

// Models
import { AuthUser } from '../../models/auth/auth-user.model';

export abstract class AuthService {
    public authUser: Observable<AuthUser>;

    abstract authorize(): Observable<void>;
    abstract isLoggedIn(): Observable<boolean>;
    abstract loginExternal(): Observable<boolean>;
    abstract loginExternalComplete();
    abstract loginExternalRenewal();
    abstract loginExternalRenewalComplete();
    abstract logoutExternal(): Observable<void>;
}
