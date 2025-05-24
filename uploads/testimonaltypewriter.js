 jQuery(document).ready(function () {
            new TypeIt('#footer-type', {
                speed: 150,
                loop: true,
                startDelay: 900
            })
                .type('We have not come this far, to come this far.')
                .pause(300)
                .delete(44)
                .type('Today could be the day or just another day.')
                .pause(300)
                .delete(43)
                .type('When the flower blooms, the bees come uninvited.')
                .pause(300)
                .delete(48)
                .type('Think before you speak, read before you think.')
                .pause(300)
                .delete(46)
                .go();



        });