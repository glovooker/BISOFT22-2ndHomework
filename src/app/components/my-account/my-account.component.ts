import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserService } from '../../services/user.service';
import { IAuthority } from '../../interfaces';

@Component({
    selector: "app-my-account",
    standalone: true,
    templateUrl: "./my-account.component.html",
})
export class MyAccountComponent implements OnInit {
    public userName: string = 'Test';
    public userRole: string = 'Admin';
    private service = inject(AuthService);
    private userService = inject(UserService);

    constructor(public router: Router) {
        this.userService.getAllSignal();
        this.userName = this.service.getUser()?.name || '';
        this.userRole = this.service.getUser()?.authorities?.map((a: IAuthority) => a.authority)[0] === 'ROLE_SUPER_ADMIN' ? 'Super Admin' : 'User';
        console.log();
    }

    ngOnInit () {}

    logout () {
        this.service.logout();
        this.router.navigateByUrl('/login');
    }
}
