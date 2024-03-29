import dashboardRoutes from './dashboardRoutes.js'

const constructorMethod = (app) => {
    app.use('/', dashboardRoutes);
  
    app.use('*', (req, res) => {
      res.status(404).json({error: 'Not found'});
    });
  };
  
export default constructorMethod;