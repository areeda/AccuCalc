// Javascript for AccuCalc
// Copyright (c) Nicholas Taylor, Joseph Areeda 2015
// Licensed under GNU Public License V3
//----------------------------------------------------

// the setup function sets attributes of multiple classes of input tags
function setup()
{
    jQuery(".numb").on("blur change", recalc);
    jQuery(".mdose").attr("step", "20")
}
function recalc()
{
    var wt = jQuery("input[name=ptWt]").val();
    var goal = jQuery("input[name=goal]").val();
    var nextdose = jQuery("input[name=nextdose]").val();
        
    var ndays = 0;
    var totaldose = 0;
    var cumDoseMgpkg = 0;
    var targetDoseMg = 0;

    if (!isNaN(goal))
    {
        jQuery("#targetDoseMgpkg").text(Number(goal).toFixed(0)+" mg/Kg");
        if (!isNaN(wt))
        {
            targetDoseMg = Number(wt) * Number(goal)
        }
    }    
    jQuery(".mdose").each(function ()
    {
        var monthly=$(this).val();
        if (!isNaN(monthly))
        {
            var thisDose = Number(monthly);
            if (thisDose > 0)
            {
                ndays = ndays + 30;
                totaldose = totaldose +  (thisDose * 30);
            }
        }
    });
    if (!isNaN(wt))
    {
        cumDoseMgpkg = totaldose / Number(wt);
        jQuery("#cumDoseMgpkg").text(cumDoseMgpkg.toFixed(2)+" mg/Kg");
        
        var remainingDose = targetDoseMg - totaldose;

        var remDoseMgpkg = remainingDose / wt;
        jQuery("#remDoseMgpkg").text(remDoseMgpkg.toFixed(2)+" mg/Kg");

        if (!isNaN(nextdose))
        {
            var remDosePills = remainingDose / Number(nextdose);
            var months = remDosePills / 30;
            jQuery("#remDoseDays").text(remDosePills.toFixed(0) + " days, " + months.toFixed(1) + "     months");
        }
    }
   
}
function jQueryVersion()
{
    alert( "You are running jQuery version: " + jQuery.fn.jquery );
}