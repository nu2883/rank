var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      show_menu:false,
      main:true,
      rankings:[],
      players:[],
      show_player:true,
      selectedPlayer:[],
      header:true,
      section:true,
      show_ranking:true,
      jumbo:true,
      show_single_player:false,



    },
    computed:{
      urutPlayers(){
        function compare(a, b) {
          if (a.player < b.player)
            return -1;
          if (a.player > b.player)
            return 1;
          return 0;
        }
    
        return this.players.sort(compare);
      }
    },
    methods:{
        showOff(){
          this.header =false;
          // this.main = false;
          this.show_player = false;
          this.jumbo = false;
          this.show_ranking = false;
          this.show_single_player = false;

        },
        showAll(){
          this.header =true;
          // this.main = false;
          this.show_player = true;
          this.jumbo = true;
          this.show_ranking = true;

        },
        mklikMenu(){
            // this.showOff();
            this.main = false;
            this.show_menu = true;
        },
        klikPlayer(x){
          this.showOff();
          this.header = true;
          this.section = true;
          this.show_single_player = true;
          // this.selectedPlayer = x;
          // alert(x.id);
          this.ambil_data_player(x.id);

        },
        ambil_data_player(id){
          this.selectedPlayer = [];
            var data_ranking = [];
            data_ranking = this.rankings.filter(x => x.id === id);
            console.log(data_ranking);

            var data_player = [];
            data_player = this.players.filter(x => x.id === id);
          var selectedPlayer1 = data_ranking.concat(data_player);
          console.log(selectedPlayer1);

          return this.selectedPlayer = data_ranking.concat(data_player);
        
        },
        klikRanking(){
          this.show_menu = false;
          this.main = true;
          this.showOff();
          this.header = true;
          this.show_ranking = true;

        },
        klikPlayers(){
          this.showOff();
          this.main = true;
          this.header = true;
          this.show_menu = false;
          this.show_player = true;

        },
        klikTurnamen(){
          this.showOff();
          this.main = true;
          this.header = true;
          this.show_menu = false;
          

        }


    },

    created(){
      this.rankings = [];

      var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=QPoints";

      $.getJSON(url, function (json) {
      // console.log(json.data);
      // console.log(json.data.records)
      app.rankings = json.data;
      });

      // ambil data players
      this.rankings = [];

      var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=QPlayers";

      $.getJSON(url, function (json) {
      // console.log(json.data);
      // console.log(json.data.records)
      app.players = json.data;
      });

    },

  })