export default filteredByDate = date => {
  let url = "http://localhost:5000/api/water/bydate";
  axios
    .get(url, {
      params: {
        email: this.state.email,
        date: moment(date).format("YYYY-MM-DD")
      }
    })
    .then(res => {
      this.setState({ waterLogs: res.data });
    })
    .catch(error => {
      console.log(error);
    });
};
