!function(e){var t;e.fn.actions=function(n){var a=e.extend({},e.fn.actions.defaults,n),s=e(this),o=!1,c=function(t){t?l():d(),e(s).prop("checked",t).parent().parent().toggleClass(a.selectedClass,t)},i=function(){var t=e(s).filter(":checked").length;e(a.counterContainer).html(interpolate(ngettext("%(sel)s of %(cnt)s selected","%(sel)s of %(cnt)s selected",t),{sel:t,cnt:_actions_icnt},!0)),e(a.allToggle).prop("checked",function(){var e;return t==s.length?(e=!0,l()):(e=!1,u()),e})},l=function(){e(a.acrossClears).hide(),e(a.acrossQuestions).show(),e(a.allContainer).hide()},r=function(){e(a.acrossClears).show(),e(a.acrossQuestions).hide(),e(a.actionContainer).toggleClass(a.selectedClass),e(a.allContainer).show(),e(a.counterContainer).hide()},d=function(){e(a.acrossClears).hide(),e(a.acrossQuestions).hide(),e(a.allContainer).hide(),e(a.counterContainer).show()},u=function(){d(),e(a.acrossInput).val(0),e(a.actionContainer).removeClass(a.selectedClass)};e(a.counterContainer).show(),e(this).filter(":checked").each(function(t){e(this).parent().parent().toggleClass(a.selectedClass),i(),1==e(a.acrossInput).val()&&r()}),e(a.allToggle).show().click(function(){c(e(this).prop("checked")),i()}),e("a",a.acrossQuestions).click(function(t){t.preventDefault(),e(a.acrossInput).val(1),r()}),e("a",a.acrossClears).click(function(t){t.preventDefault(),e(a.allToggle).prop("checked",!1),u(),c(0),i()}),t=null,e(s).click(function(n){n||(n=window.event);var o=n.target?n.target:n.srcElement;if(t&&e.data(t)!=e.data(o)&&n.shiftKey===!0){var c=!1;e(t).prop("checked",o.checked).parent().parent().toggleClass(a.selectedClass,o.checked),e(s).each(function(){(e.data(this)==e.data(t)||e.data(this)==e.data(o))&&(c=c?!1:!0),c&&e(this).prop("checked",o.checked).parent().parent().toggleClass(a.selectedClass,o.checked)})}e(o).parent().parent().toggleClass(a.selectedClass,o.checked),t=o,i()}),e("form#changelist-form table#result_list tr").find("td:gt(0) :input").change(function(){o=!0}),e('form#changelist-form button[name="index"]').click(function(e){return o?confirm(gettext("You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.")):void 0}),e('form#changelist-form input[name="_save"]').click(function(t){var n=!1;return e("select option:selected",a.actionContainer).each(function(){e(this).val()&&(n=!0)}),n?o?confirm(gettext("You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.")):confirm(gettext("You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.")):void 0})},e.fn.actions.defaults={actionContainer:"div.actions",counterContainer:"span.action-counter",allContainer:"div.actions span.all",acrossInput:"div.actions input.select-across",acrossQuestions:"div.actions span.question",acrossClears:"div.actions span.clear",allToggle:"#action-toggle",selectedClass:"selected"}}(django.jQuery);