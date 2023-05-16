const custom_study = function (PineJS) {
  return {
    name: 'Demo Study Description',
    metainfo: {
      _metainfoVersion: 51,
      id: 'demo_study_id@tv-basicstudies-1',
      description: 'Demo Study Description',
      shortDescription: 'Demo Study short description',
      is_hidden_study: true,
      is_price_study: true,
      isCustomIndicator: true,
      format: {
        type: 'price',
        precision: 2,
      },

      plots: [
        { id: 'plot_0', type: 'line' }
      ],
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            visible: true,
            linewidth: 2,
            plottype: 2,

            // Show price line?
            trackPrice: true,

            // Plot color
            color: '#0000FF'
          }
        },
        precision: 2,
        inputs: {}
      },
      styles: {
        plot_0: {
          title: '-- output name --',
          histogramBase: 0,
        }
      },
      'inputs': [],
    },

    constructor: function () {
      this.init = function (context, inputCallback) {
        this._context = context;
        this._input = inputCallback;

        console.log(context, "CONTEXT ....")

        // Define the symbol to be plotted.
        // Symbol should be a string.
        // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
        // For example,
        //    var symbol = 'AAPL';
        //    var symbol = '#EQUITY';
        //    var symbol = PineJS.Std.ticker(this._context) + '#TEST';
        // var symbol = PineJS.Std.ticker(this._context)
        // this._context.new_sym(symbol, PineJS.Std.period(this._context));
      };

      this.main = function (context, inputCallback) {
        this._context = context;
        this._input = inputCallback;
        console.log(context, "CONTEXT From main ....")
        this._context.select_sym(1);

        // You can use following built-in functions in PineJS.Std object:
        //    open, high, low, close
        //    hl2, hlc3, ohlc4
        var v = PineJS.Std.close(this._context);
        // console.log(v, " CLOSE >>>>> ")
        return [v * 2];
      }
    }
  }
}

export default custom_study