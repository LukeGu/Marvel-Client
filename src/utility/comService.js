const axios = require("axios");

class ComicService {
  getComicsList = condition => {
    let urlCondition = "";
    if (condition) {
      console.log(condition);
      Object.entries(condition).forEach(item => {
        urlCondition = urlCondition + item[0] + "=" + item[1] + "&";
      });
    }
    const url = `http://localhost:4000/comics/getComics/${urlCondition}`;
    return axios.get(url).then(result => {
      return result.data;
    });
  };
}

export default ComicService;
