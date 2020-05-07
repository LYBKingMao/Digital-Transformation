type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
  initPickColor: function () {
    $('.pick-class-label').click(function () {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },


  initDashboardPageCharts: function () {

    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(38, 120, 246,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#878484"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(38, 120, 246,.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#878484"
          }
        }]
      }
    };

    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(38, 120, 246,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(38, 120, 246,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    var ctxDonut = document.getElementById("DonutChart").getContext("2d");

    var data = {
      labels: ['Heat', 'Light', 'Air Conditioning', 'Electricity', 'Emmissions'],
      datasets: [{
        label: "Year 2018",
        fill: true,
        backgroundColor: "rgba(235, 12, 12,0.2)",
        borderColor: "rgba(240, 103, 103,1)",
        pointBorderColor: "#fff",
        pointLabelFontColor: '#ffffff',
        pointBackgroundColor: "rgba(240, 103, 103,1)",
        data: [26, 18, 13, 28, 15],
      }, {

        label: "Year 2019",
        fill: true,
        backgroundColor: "rgba(23, 16, 224,0.2)",
        borderColor: "rgba(103, 128, 240,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(103, 128, 240,1)",
        pointBorderColor: "#fff",
        data: [25.48, 11, 15, 22, 19]
      }
      ]
    };

    var options = {
      title: {
        display: true,
        text: 'Energy Contribution of the Five Sectors',
        fontColor: '#ffffff',
        fontSize: 20
      },
      scale: {
        gridLines: {
          drawBorder: false,
          color: 'rgba(255, 255, 255,0.7)',
          zeroLineColor: "transparent",
        },
        ticks: {
          beginAtZero: true,
          color: 'rgba(255, 255, 255,0.6)',
          max: 40
        }
      },
      labels: {
        fontColor: "#ffffff",
      },

      legend: {
        labels: {
          fontColor: "white",

        }
      },
    };

    var myChart = new Chart(ctxDonut, {
      type: 'radar',
      data: data,
      options: options
    })


  },

  showNotification: function (from, align) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "tim-icons icon-bell-55",
      message: "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer."

    }, {
        type: type[color],
        timer: 8000,
        placement: {
          from: from,
          align: align
        }
      });
  }

};