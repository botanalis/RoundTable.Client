import {AuthenticationService} from "../_services";

export function appInitializer(authenticationService: AuthenticationService) {
  return () => new Promise(resolve => {
    authenticationService.refreshToken().subscribe().add(resolve);
  });

}
