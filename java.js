//this function picks up and checks if the piece is able to be placed in a tower.
(function () {
    var App, bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };
    //picking up your piece and moving it to the tower you click.
    App = function () {
        function App() {
            this.movePiece = bind(this.movePiece, this);
            this.getElements();
            this.addListeners();
        }
        //grabs the piece on click
        App.prototype.getElements = function () {
            this.container = document.querySelector('.tower');
            this.posts = this.container.querySelectorAll('li');
            this.moveLabel = document.querySelector('label');
            this.selected = null;
            return this.moves = 0;
        };
        //checking the size of the piece to see if you can place it in the place you want to
        App.prototype.addListeners = function () {
            var i, len, post, ref, results, self;
            self = this;
            ref = this.posts;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }
                post = ref[i];
                results.push(post.addEventListener('click', function () {
                    if (self.selected === null) {
                        this.classList.add('selected');
                        return self.selected = this;
                    } else {
                        return self.movePiece(this);
                    }
                }));
            }
            window.CP.exitedLoop(1);
            return results;
        };
        //detects if a piece has been moved
        App.prototype.movePiece = function (destination) {
            var destinationWidth, ref, ref1, targetWidth;
            destinationWidth = parseInt((ref = destination.lastElementChild) != null ? typeof ref.getAttribute === 'function' ? ref.getAttribute('data-width') : void 0 : void 0);
            targetWidth = parseInt((ref1 = this.selected.lastElementChild) != null ? typeof ref1.getAttribute === 'function' ? ref1.getAttribute('data-width') : void 0 : void 0);
            //adds to the counter if piece has been moved.
            if (isNaN(destinationWidth) || targetWidth < destinationWidth) {
                destination.appendChild(this.selected.lastElementChild);
                this.moves++;
                this.moveLabel.innerHTML = this.moves;
            }
            this.selected.classList.remove('selected');
            return this.selected = null;
        };
        return App;
    }();
    new App();
}.call(this));