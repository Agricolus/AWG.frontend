declare namespace server {
  interface userInfo {
    app_azf_domain: string;
    app_id: string;
    attributes: any;
    authorization_decision: string;
    displayName: string;
    eidas_profile: any;
    email: string;
    id: string;
    image: string;
    isGravatarEnabled: boolean;
    organizations: organization[];
    roles: role[];
    trusted_apps: any[];
    username: string
  }

  interface role {
    id: string;
    name: string;
  }

  interface organization {
    id: string;
    name: string;
    description: string;
    website: string;
    roles: role[];
  }
}