define(['jQuery','jqEasyUI','./ComfirmDialog'
], function($,jaEasyUI) {
    var viewName = $('#_moduleViewName').val();
    if(viewName != 'vpsDataInput'){
        return;
    }
    $('.trees li:has(ul)').addClass('parent_li').find(' > ul > li').hide('fast');
    $('.trees li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.trees li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            var firstLi = $(this).attr('title', 'Expand this branch').find(' > i')[0];
            $(firstLi).addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            var firstLi = $(this).attr('title', 'Expand this branch').find(' > i')[0];
            $(firstLi).addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
    $(".trees").click(function (e) {
        e.stopPropagation();
    });
    $("i.icon-leaf").parent().click(function (e) {
        var span = $(this).parent().parent().siblings("span");
        var myI = $(span).find('i')[1];
        var $myI = $(myI);
        $myI.removeAttr("class");

        //关卡code
        var leafList = $("#selectedLeaf").val();
        //点击的关卡code
        var leaf = $(this).attr("leafCode");

        var tree_class = $(this).attr("class");
        if (tree_class === "selected_tree") {
            $(this).removeClass("selected_tree");
            $("#selectedLeaf").val(leafList.replace(leaf+",",""));
        } else {
            $(this).addClass("selected_tree");
            $("#selectedLeaf").val(leafList+leaf+",");
        }
        var allList = $(this).parent().parent().find('li > span');
        var allLen = allList.length;
        var filterList = allList.filter(".selected_tree");
        var filterLen = filterList.length;
        //全选
        if(allLen == filterLen){
            $myI.addClass("icon-ok");
        //半选
        }else if(filterLen < allLen && filterLen != 0){
            $myI.addClass("icon-ok-sign");
        }
        e.stopPropagation();
    });
    $(".selectedAll").click(function(e){
        var span = $(this).siblings("span");
        var myI = $(span).find('i')[1];
        var $myI = $(myI);
        $myI.removeAttr("class");

        //关卡code
        var leafList = $("#selectedLeaf").val();

        var allList = $(this).parent().find('li > span');
        var allLen = allList.length;
        var filterList = allList.filter(".selected_tree");
        var filterLen = filterList.length;
        if(allLen == filterLen){
            //全不选
            allList.removeClass("selected_tree");
            for(var i=0;i<allList.length;i++){
                var leaf = $(allList[i]).attr("leafCode");
                leafList = leafList.replace(leaf+",","")
            }
            $("#selectedLeaf").val(leafList);
        }else{
            //全选
            allList.removeClass("selected_tree");
            allList.addClass("selected_tree");
            $myI.addClass("icon-ok");
            for(var i=0;i<allList.length;i++){
                var leaf = $(allList[i]).attr("leafCode");
                if(leafList.indexOf(leaf+",") == -1){
                    leafList = leafList+leaf+",";
                }
            }
            $("#selectedLeaf").val(leafList);
        }
        e.stopPropagation();
    });

    $(".selected_course").click(function(){
        var text = $(this).text();
        var span = $("<span></span>");
        span.addClass("caret");
        $("#check_course").text(text+" ").append(span);
        var lesson = $(this).attr("lesson");
        $("#selected_lesson").val(lesson);
    });

    var showDataGrid = function (frozenCols, cols, data) {
        $('#dataInputDataGrid').datagrid({
            rownumbers:true,
            singleSelect:true,
            sortName:"stu_number",
            sortOrder:"asc",
            frozenColumns : frozenCols,
            columns : cols,
            data:data,
            onClickCell:onClickCell,
            onAfterEdit:endAfterHandler
        });
    };

    $('#dataInputReloadGrid').click(function(e){
        var level1 = $("#selectedLeaf").val();
        var lesson = $("#selected_lesson").val();
        if(level1 == null || $.trim(level1).length == 0){
            $('#showMessage').popover('show');
            return false;
        }
        if(lesson == null || $.trim(lesson).length == 0){
            $('#showMessage').popover('show');
            return false;
        }
        $('#showMessage').popover('hide');
        $('#showMessage').popover('destroy');
        $("#class-tree").removeClass("open");
        $("#dataInputSaveGrid").removeAttr("style");
        level1 = level1.substr(0,level1.lastIndexOf(","));
        $.ajax({
            url:"scores",
            dataType: "json",
            data:"level1="+level1+"&lesson="+lesson,
            success: function(data) {
                showDataGrid(data.tmpFrozenCols, data.tmpCols, data.data);
            },
            error:function(){
                $.teninedialog({
                    title:'系统提示',
                    content:'链接异常，请联系管理员！',
                    showCloseButton:false,
                    dialogShown:function(modal){
                        setTimeout(function(){
                            $(this).closeDialog(modal);
                        },2000);
                    }
                })
            }
        });
    });

    $('#dataInputSaveGrid').click(function(e){
        var lesson = $("#selected_lesson").val();
        changelogMap.lesson = lesson; // 需要动态的从前台网页上获取。
        endEditing();
        $.ajax({
            url:"score-save",
            dataType: "json",
            data:changelogMap,
            success: function(data) {
                if(data.success){
                    $.teninedialog({
                        title:'系统提示',
                        content:'保存成功！',
                        showCloseButton:false,
                        dialogShown:function(modal){
                            setTimeout(function(){
                                $(this).closeDialog(modal);
                            },2000);
                        }
                    })
                }
            },
            error:function(){
                $.teninedialog({
                    title:'系统提示',
                    content:'保存失败，请联系管理员！',
                    showCloseButton:false,
                    dialogShown:function(modal){
                        setTimeout(function(){
                            $(this).closeDialog(modal);
                        },2000);
                    }
                })
            }
        });
    });

    $.extend($.fn.datagrid.methods, {
        editCell: function(jq,param){
            return jq.each(function(){
                var opts = $(this).datagrid('options');
                var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
                for(var i=0; i<fields.length; i++){
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor1 = col.editor;
                    if (fields[i] != param.field){
                        col.editor = null;
                    }
                }
                $(this).datagrid('beginEdit', param.index);
                for(var i=0; i<fields.length; i++){
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor = col.editor1;
                }
            });
        }
    });

    var editIndex = undefined;
    function endEditing(){
        if (editIndex == undefined){return true}
        if ($('#dataInputDataGrid').datagrid('validateRow', editIndex)){
            $('#dataInputDataGrid').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    };

    function onClickCell(index, field){
        if (endEditing()){
            $('#dataInputDataGrid').datagrid('selectRow', index)
                .datagrid('editCell', {index:index,field:field});
            editIndex = index;
        }
    };

    var changelogMap = {};
    function endAfterHandler(rowIndex, rowData, changes) {
        var stu = changelogMap[rowData.id];
        if(stu == undefined) {
            stu = {};
            changelogMap[rowData.id] = stu;
        }

        for(var field in changes) {
            stu[field] = changes[field];
        }
    };
    return {};
});
