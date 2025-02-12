import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/authservices/auth.service';

export const listGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLogged() && authService.getUserPermissions() === 'Administrador' || authService.getUserPermissions() === 'Consumidor'){
    return true;
  }else{
    router.navigate(['/']);
    return false;
  }
};
