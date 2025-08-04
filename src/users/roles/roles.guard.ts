// src/users/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../utils/roles.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    // Aquí deberías obtener el usuario autenticado.
    // Por ahora, asumiremos un usuario de prueba.
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Normalmente, esto vendría del proceso de autenticación

    // Simulación de un usuario para este ejemplo
    const userTest = {
      role: Role.Admin // Puedes cambiarlo a Role.User para probar el acceso denegado
    };

    return requiredRoles.includes(userTest.role);
  }
}