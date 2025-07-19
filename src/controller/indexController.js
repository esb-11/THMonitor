import db from "../db.js";

const indexController = (() => {
  function indexGet(req, res) {
    res.render("index", {
      title: "Data",
      table: db.get(),
    });
  }
  
  return { indexGet };
})();

export default indexController;
