const webViewBridge = {
  init : () => {

    let promiseChain = Promise.resolve();

    let callbacks = {};

    const guid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }

     window.webViewBridge  = {
      /**
       * send message to the React-Native WebView onMessage handler
       * @param targetFunc - name of the function to invoke on the React-Native side
       * @param data - data to pass
       * @param success - success callback
       * @param error - error callback
       */
      send: function(targetFunc , data , success , error ) {
        alert(targetFunc)
        let msgObj = {
          targetFunc: targetFunc,
          data: data || {}
        };

        if (success || error) {
          // @ts-ignore
          msgObj.msgId = guid();
        }

        let msg = JSON.stringify(msgObj);

        // @ts-ignore
        promiseChain = promiseChain.then(function () {
          return new Promise(function (resolve, reject) {
            console.log("sending message " + msgObj.targetFunc);

            // @ts-ignore
            if (msgObj.msgId) {
              // @ts-ignore
              callbacks[msgObj.msgId] = {
                onsuccess: success,
                onerror: error
              };
            }
            console.log(msg)
            alert('call')
            // @ts-ignore
            window.postMessage(msg);

            resolve();
          })
        }).catch(function (e) {
          console.error('rnBridge send failed ' + e.message);
        });
      },


    };
    window.document.addEventListener('message', function(e) {
      console.log("message received from react native");

      var message;
      try {
        // @ts-ignore
        message = JSON.parse(e.data)
      }
      catch(err) {
        console.error("failed to parse message from react-native " + err);
        return;
      }

      //trigger callback
      // @ts-ignore
      if (message.args && callbacks[message.msgId]) {
        if (message.isSuccessfull) {
          // @ts-ignore
          callbacks[message.msgId].onsuccess.apply(null, message.args);
        }
        else {
          // @ts-ignore
          callbacks[message.msgId].onerror.apply(null, message.args);
        }
        // @ts-ignore
        delete callbacks[message.msgId];
      }

    });

  }
}

export default webViewBridge
