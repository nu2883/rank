var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      show_menu:false,
      main:true,
      rankings:[],
      players:[],
      matchs:[],
      data_match:[],
      data_matchs:true,
      matchs:[],
      header:true,
      section:true,
      show_ranking:true,
      show_player:true,
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
      },
      data_match_sort(){
        function compare1(a, b) {
          if (a.row > b.row)
            return -1;
          if (a.row < b.row)
            return 1;
          return 0;
        }
    
        return this.data_match[0].sort(compare1);
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
          this.show_single_player = false;

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
          this.ambil_data_player(x);

        },
        ambil_data_player(id){
          this.selectedPlayer = [];
            var data_ranking = [];
            data_ranking = this.rankings.filter(x => x.id === id.id);
            // console.log(data_ranking);

            var data_player = [];
            data_player = this.players.filter(x => x.id === id.id);
            var selectedPlayer1 = data_ranking.concat(data_player);
            // console.log(selectedPlayer1);

            var data_match1 = [];
            data_match1 = this.matchs.filter(x => x.player1 == id.player||x.player2 == id.player||x.player3 == id.player ||x.player4 == id.player);
            console.log(data_match1);

            this.data_match = [data_match1];
            
            
            var ranking_player = data_ranking.concat(data_player);

            var selectedPlayer1 = ranking_player.concat([this.data_match_sort]);
            console.log(selectedPlayer1);


          return this.selectedPlayer = selectedPlayer1;
        
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

      // ambil data match
      this.matchs = [];

      var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=match";

      $.getJSON(url, function (json) {
      // console.log(json.data);
      // console.log(json.data.records)
      app.matchs = json.data;
      });

    },

  })