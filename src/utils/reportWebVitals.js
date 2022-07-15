const REPORT_WEB_VITALS = onPerfEntry => {

  if (onPerfEntry && onPerfEntry instanceof Function) {
  
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
  
    });
  
  }

};

export default REPORT_WEB_VITALS;
