   function init() {
      // Set length and width
      W = 500;
      H = 500;


      // Initialize canvases, contexts, and images
      canvas =  document.getElementById('image');
      context = canvas.getContext('2d');
      imageData = context.createImageData(W, H);

      // Neighborhood kernels
      moore = [[1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]];
      vonNeumann = [[0, 1], [1, 0], [0, -1], [-1, 0]];

      // Color maps
      colors1 = [[255, 255, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255]];
      colors4 = [[255, 255, 255, 255], [0, 0, 0, 255], [85, 85, 85, 255], [170, 170, 170, 255]];
      colors3 = [[255, 255, 255, 255], [252, 157, 3, 255], [252, 186, 3, 255], [252, 223, 3, 255]];  
      colors = [[0, 0, 0, 255], [252, 157, 3, 255], [252, 186, 3, 255], [252, 223, 3, 255]];  
      colors = [[0, 0, 0, 255], [252, 157, 3, 255], [252, 186, 3, 255], [252, 223, 3, 255]];  
      colors2 = [[0, 0, 0, 255], [255, 255, 255, 255], [255, 0, 0, 255], [0, 255, 0, 255]];


      // Create initial state array
      state = new Array(H);
      for (let i = 0; i < state.length; i++) {
        state[i] = new Uint8Array(W);
      }

      // Create random starting state
      size = 30;
      for (let i = H/2-size; i < H/2+size; i++) {
        for (let j = W/2-size; j < W/2+size; j++) {
          state[i][j] = Number(1 ? Math.random() > 0.5 : 0);
        }
      }

      // Display starting state
      displayImage(state, colors);

      setTimeout(run, 500);
    }
    
    // The transition function
    function transition(X, K, S, B, G) {
      // X : Array[Array[int]]
      // K : Array[Array[int]]
      // S : Array[int]
      // B : Array[int]
      // G : int

      // Create next state array
      X2 = new Array(H);
      for (let i = 0; i < X2.length; i++) {
        X2[i] = new Uint8Array(W).fill(0);
      }

      // Loop through elements of state 
      for (let i = 0; i < X.length; i++) {
        for (let j = 0; j < X[0].length; j++) {
          // Get number of live neighbors
          numLive = 0;
          for (let k = 0; k < K.length; k++) {
            // Neighbor coordinates
            x = K[k][0];
            y = K[k][1];

            if (X[i+x] != undefined) {
              numLive += 1 ? X[i+x][j+y] == 1 : 0
            }
          }

          // Update next state
          if (X[i][j] == 1) {
            if (S.includes(numLive)) {
              X2[i][j] = 1;
            } else {
              X2[i][j] = (X[i][j] + 1) % G;
            }
          } else if (X[i][j] == 0) {
            if (B.includes(numLive)) {
              X2[i][j] = 1;
            } else {
              X2[i][j] = 0;
            }
          } else {
            X2[i][j] = (X[i][j] + 1) % G;
          }
        }
      }
      return X2;
    }


    // Display function
    function displayImage(X, colorMap) {
      // loop through X
      // update imageData.data
      for (let i = 0; i < X.length; i++) {
        for (let j = 0; j < X[0].length; j++) {
          // Get color Array
          colorArray = colorMap[X[i][j]];

          imageData.data[i*4*W + j*4] = colorArray[0];
          imageData.data[i*4*W + j*4 + 1] = colorArray[1];
          imageData.data[i*4*W + j*4 + 2] = colorArray[2];
          imageData.data[i*4*W + j*4 + 3] = colorArray[3];
        }
      }
      context.putImageData(imageData, 0, 0);
    }

    // Recursively update state and display image
    function run() {
      // Game of Life
      // state = transition(state, moore, [2, 3], [3], 2);

      // Brian's Brain
      // state = transition(state, moore, [], [2], 3);

      // Star Wars
      state = transition(state, moore, [3,4,5], [2], 4);

      displayImage(state, colors);
      setTimeout(run, 1);
    }


