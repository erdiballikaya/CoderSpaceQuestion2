$(".searchButton").click(function(){
    var type = $(".requestType :selected").val();
    if(type == "ajax")
        Ajax();
    if(type == "fetch")
        Fetch();
    if(type == "axios")
        Axios();
  });

  function Ajax() {
    var searchText = $('#search').val();
    $.get("http://www.omdbapi.com/?apikey=119d0694&t="+ searchText, function(data, status){
       
        if(status == "success")
        {
            fillElements(data);
        }
    });
  }

  function Fetch() {
    var searchText = $('#search').val();

    fetch("http://www.omdbapi.com/?apikey=119d0694&t="+ searchText)
      .then(data => {
        return data.json()
      })
      .then(data => {
        fillElements(data);
      });
  }

  function Axios() {
    var searchText = $('#search').val();
    const endPoint = "http://www.omdbapi.com/?apikey=119d0694&t="+ searchText;
    axios.get(endPoint)
      .then(data => fillElements(data.data))
      .catch(err => console.log(err))
  }

  function fillElements(data){
    if(data.Response != "False"){
        $(".title").text(data.Title);
        $(".actors").text(data.Actors);
        $(".years").text(data.Year);
        $("#my_image").attr("src", data.Poster);
    
        console.log(data);
    }
    else{
        $(".title").text(data.Error);
        $(".actors").text("");
        $(".years").text("");
        $("#my_image").attr("src", "");
    }


  }