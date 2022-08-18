const CapaContext = {
    capaEndpoint: () => `${Api.baseUrl}/`,
    CapaLista: () => `${CapaContext.capaEndpoint()}all-capas`,
    capaById: (id) => `${CapaContext.capaEndpoint()}one-capa/${id}`,
    createCapa: () => `${CapaContext.capaEndpoint()}create-capa`,
    updateCapaById: (id) => `${CapaContext.capaEndpoint()}update-capa/${id}`,
    deleteCapaById: (id) => `${CapaContext.capaEndpoint()}delete-capa/${id}`,
  };
  
  export const Api = {
    baseUrl: "http://localhost:3000",
    ...CapaContext,
  };
