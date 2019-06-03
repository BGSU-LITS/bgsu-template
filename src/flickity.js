import Flickity from 'flickity-bg-lazyload';
import 'flickity/css/flickity.css';
import './css/flickity.css';

Flickity.defaults.accessibility = false;
Flickity.defaults.cellAlign = 'left';
Flickity.defaults.contain = true;
Flickity.defaults.pageDots = false;

Flickity.defaults.arrowShape = {
    x0: 10,
    x1: 60, y1: 50,
    x2: 75, y2: 35,
    x3: 40
};

Flickity.PrevNextButton.prototype.update = function() {
    var slides = this.parent.slides;
    var selectedSlide = slides[this.parent.selectedIndex];
    var boundarySlide = slides[
        this.isPrevious ? 0 : slides.length ? slides.length - 1 : 0
    ];

    if (selectedSlide.target != boundarySlide.target) {
        this.enable();
    } else {
        this.disable();
    }
};

export function setup(selector, config = {}) {
    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function(group) {
            var flickity = new Flickity(group, config);

            Array.prototype.forEach.call(
                group.querySelectorAll('a'),
                function(anchor, index) {
                    anchor.addEventListener('focus', function() {
                        if (index > flickity.selectedIndex) {
                            if (!flickity.nextButton.isEnabled) {
                                return;
                            }
                        }

                        flickity.selectCell(index);
                    });
                }
            );
        }
    );
}
