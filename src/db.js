const db = (() => {
  const database = [];

  function add(data) {
    database.push(data);
  }

  function get() {
    return database
  }

  return { add, get };
})();

export default db;
