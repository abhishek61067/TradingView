import { getErrorMessage, } from './helpers';
export class HistoryProvider {
    constructor(datafeedUrl, requester) {
        this._datafeedUrl = datafeedUrl;
        this._requester = requester;
    }

    // async getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {

    //     const defaultFrom = new Date('2012-01-01').getTime() / 1000;
    //     const {from, to, firstDataRequest} = periodParams;

    //     const fromTime = firstDataRequest ? defaultFrom : from;

    //     const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    //     const urlParameters = {
    //         symbol: symbolInfo.name,
    //         // fsym: parsedSymbol.fromSymbol,
    //         // tsym: parsedSymbol.toSymbol,
    //         from: fromTime,
    //         to: to,
    //         limit: 2000,
    //     };
    //     const query = Object.keys(urlParameters)
    //         .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
    //         .join('&');
    //     try {
    //         const data = await makeApiRequest(`history/?${query}`);
    //         if (data.Response && data.Response === 'Error' || data.length === 0) {
    //             // "noData" should be set if there is no data in the requested period.
    //             onHistoryCallback([], {noData: true});
    //             return;
    //         }
    //         let bars = [];
    //         data.forEach(bar => {
    //             if (bar.t >= from && bar.t < to) {
    //                 bars = [...bars, {
    //                     time: bar.t * 1000,
    //                     low: bar.l,
    //                     high: bar.h,
    //                     open: bar.o,
    //                     close: bar.c,
    //                     volume: bar.v,
    //                 }];
    //             }
    //         });
    //         console.log(`[getBars]: returned ${bars.length} bar(s)`);
    //         onHistoryCallback(bars, {noData: false});
    //     } catch (error) {
    //         console.log('[getBars]: Get error', error);
    //         onErrorCallback(error);
    //     }
    // }
    getBars(symbolInfo, resolution, periodParams) {
        const requestParams = {
            symbol: symbolInfo.ticker || '',
            resolution: resolution,
            from: periodParams.from,
            to: periodParams.to,
        };
        if (periodParams.countBack !== undefined) {
            requestParams.countback = periodParams.countBack;
        }
        if (symbolInfo.currency_code !== undefined) {
            requestParams.currencyCode = symbolInfo.currency_code;
        }
        if (symbolInfo.unit_id !== undefined) {
            requestParams.unitId = symbolInfo.unit_id;
        }
        return new Promise((resolve, reject) => {
            this._requester.sendRequest(this._datafeedUrl, 'history', requestParams)
                .then((response) => {
                if (response.s !== 'ok' && response.s !== 'no_data') {
                    reject(response.errmsg);
                    return;
                }
                const bars = [];
                const meta = {
                    noData: false,
                };
                if (response.s === 'no_data') {
                    meta.noData = true;
                    meta.nextTime = response.nextTime;
                }
                else {
                    // const volumePresent = response.v !== undefined;
                    // const ohlPresent = response.o !== undefined;
                    // console.log(response, " HISTORY RESPONSE ....")
                    response.data.forEach(bar => {
                        // if (bar.t >= from && bar.t < to) {
                        bars.push({
                            time: bar.t * 1000,
                            low: bar.l,
                            high: bar.h,
                            open: bar.o,
                            close: bar.c,
                            volume: bar.v,
                        });
                        // }
                    });
                    // for (let i = 0; i < response.t.length; ++i) {
                    //     const barValue = {
                    //         time: response.t[i] * 1000,
                    //         close: parseFloat(response.c[i]),
                    //         open: parseFloat(response.c[i]),
                    //         high: parseFloat(response.c[i]),
                    //         low: parseFloat(response.c[i]),
                    //     };
                    //     if (ohlPresent) {
                    //         barValue.open = parseFloat(response.o[i]);
                    //         barValue.high = parseFloat(response.h[i]);
                    //         barValue.low = parseFloat(response.l[i]);
                    //     }
                    //     if (volumePresent) {
                    //         barValue.volume = parseFloat(response.v[i]);
                    //     }
                    //     bars.push(barValue);
                    // }
                }
                resolve({
                    bars: bars,
                    meta: meta,
                });
            })
                .catch((reason) => {
                const reasonString = getErrorMessage(reason);
                // tslint:disable-next-line:no-console
                console.warn(`HistoryProvider: getBars() failed, error=${reasonString}`);
                reject(reasonString);
            });
        });
    }
}
