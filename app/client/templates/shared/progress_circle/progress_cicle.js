// This is still ugly trying to have default value checks and defaults
Template.progressCircle.helpers({
    sizeCalc : function(progress, radius, className) {
        var radiusCalc = radius || 20;
        return {
            radiusCalc: radiusCalc,
            className: className || 'green',
            strokeWidth: Math.round(radiusCalc*0.07),
            svgSize: {
                height: radiusCalc*2,
                width: radiusCalc*2
            },
            radiusA: Math.round(radiusCalc*0.82),
            radiusB: Math.round(radiusCalc*0.73),
            fontSize: Math.round(radiusCalc*0.6),
            progressCalc: Session.get('progressvalue') || 0
        };
    },
    progressLine : function(progress, r) {

        var toRadians = Math.PI / 180;
        // Update the wheel giving to it a value in degrees,
        // getted from the percentage of the input value
        // a.k.a. (value * 360) / 100
        var degrees = ((Session.get('progressvalue') > 100) ? 100 : Session.get('progressvalue')) * 3.5999,
        // Convert the degrees value to radians
            rad = degrees * toRadians,
        // Determine X and cut to 2 decimals
            x = (Math.sin(rad) * r).toFixed(2),
        // Determine Y and cut to 2 decimals
            y = -(Math.cos(rad) * r).toFixed(2),
        // The another half ring. Same as (deg > 180) ? 1 : 0
            lenghty = window.Number(degrees > 180),
        // Moveto + Arcto
            descriptions = ['M', 0, 0, 'v', -r, 'A', r, r, 1, lenghty, 1, x, y, 'z'];
        // Apply changes to the path
        return {
            'd': descriptions.join(' '),
            transform: 'translate(' + r + ', ' + r + ')'
        }
    }
});



/*****************************************************************************/
/* SetupStepTwo: Lifecycle Hooks */
/*****************************************************************************/
Template.progressCircle.created = function () {
    Session.set('progressvalue', 0);
};

Template.progressCircle.rendered = function () {

};

Template.progressCircle.destroyed = function () {
};
