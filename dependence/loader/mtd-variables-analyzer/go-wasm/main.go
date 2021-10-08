package main

import (
    "encoding/json"
    "log"
    "strings"
    "syscall/js"
)

func main()  {
    variablesObj := js.Global().Get("variables")
    variables := variablesObj.String()
    result := Compute(variables)
    computeFn := js.Global().Get("computeVariables")
    computeFn.Invoke(result)
}

func Compute(content string) string {
    list := strings.Split(content, "@module component")
    ch := make(chan bool, 2)
    var base *Base
    var component *Component
    go func() {
        base = AnalyzeBaseVariables(list[0])
        ch <- true
    }()
    go func() {
        component = AnalyzeComponentVariables(list[1])
        ch <- true
    }()
    for i := 0; i < 2; i++ {
        <-ch
    }
    componentProp := ComponentProp{
        Base:               base.Base,
        BaseVariables:      base.BaseVariables,
        Component:          component.Component,
        ComponentVariables: component.ComponentVariables,
    }
    buf, err := json.Marshal(&componentProp)
    if err != nil {
        log.Fatal()
    }
    return string(buf)
}

func AnalyzeBaseVariables(variables string) *Base {
    var (
        base                     = make(map[string]*BaseItem)
        baseItem                 = NewBaseItem()
        baseCategoryItem         = NewBaseCategoryItem()
        baseVariableItem         = NewBaseVariableItem()
        isIgnore                 = false
        isMultiLineComment       = false
        isVariableHide           = false
        isVariableUnconfigurable = false
        isUnselected             = false
    )

    lines := strings.Split(variables, "\n")
    for _, item := range lines {
        line := strings.Trim(item, " ")

        if strings.Contains(line, "/*") {
            isMultiLineComment = true
            continue
        }
        if isMultiLineComment {
            if strings.Contains(line, "*/") {
                isMultiLineComment = false
                continue
            }
        }

        if strings.Contains(line, "@ignore") {
            isIgnore = true
            continue
        }
        if strings.Contains(line, "@end ignore") {
            isIgnore = false
            continue
        }

        if !(NoOp(line) || isIgnore || isMultiLineComment) {
            if strings.HasPrefix(line, "$") && strings.Contains(line, "!default") {
                strList := strings.Split(line, ":")
                for index, val := range strList {
                    strList[index] = strings.Trim(val, " ")
                }
                attribute := strings.Join(strings.Split(strList[0], "")[1:], "")
                value := strings.Split(strList[1], "!default")[0]
                baseVariableItem.Attribute = attribute
                baseVariableItem.Value = value
                baseVariableItem.Hide = isVariableHide
                baseVariableItem.Unconfigurable = isVariableUnconfigurable
                baseVariableItem.Unselected = isUnselected
                if baseVariableItem.Label == "" {
                    baseVariableItem.Label = baseVariableItem.Attribute
                }
                baseCategoryItem.Variables = append(baseCategoryItem.Variables, baseVariableItem)
                continue
            }

            if strings.Contains(line, "@module base") {
                continue
            }

            if strings.Contains(line, "@end module") {
                break
            }

            // 处理基础变量第一级目录
            if strings.Contains(line, "@type") {
                lineInfo := NewLineInfo(line, "@type")
                baseItem.Name = lineInfo.GetName()
                baseItem.Label = lineInfo.GetLabel()
                continue
            }

            if strings.Contains(line, "@end type") {
                base[baseItem.Name] = baseItem
                baseItem = NewBaseItem()
                continue
            }

            // 处理第二级变量
            if strings.Contains(line, "@category") {
                lineInfo := NewLineInfo(line, "@category")
                baseCategoryItem.CategoryName = lineInfo.GetName()
                baseCategoryItem.CategoryLabel = lineInfo.GetLabel()
                continue
            }

            if strings.Contains(line, "@end category") {
                baseItem.Category = append(baseItem.Category, baseCategoryItem)
                baseCategoryItem = NewBaseCategoryItem()
                continue
            }

            // 确定变量是否被隐藏
            if strings.Contains(line, "@hide") {
                isVariableHide = true
                continue
            }
            if strings.Contains(line, "@end hide") {
                isVariableHide = false
                continue
            }

            // 确定变量是否不可配置
            if strings.Contains(line, "@unconfigurable") {
                isVariableUnconfigurable = true
                continue
            }
            if strings.Contains(line, "@end unconfigurable") {
                isVariableUnconfigurable = false
                continue
            }

            if strings.Contains(line, "@unselected") {
                isUnselected = true
                continue
            }
            if strings.Contains(line, "@en unselected") {
                isUnselected = false
                continue
            }

            // 如果一个变量的值是表达式，通过该注解获取到表达式的值
            if strings.Contains(line, "@value") {
                list := strings.Split(line, "@value")
                baseVariableItem.ExpressionValue = strings.Trim(list[1], " ")
                continue
            }

            if strings.Contains(line, "@isolation") {
                baseVariableItem.Isolation = true
                continue
            }

            // 变量的中文名，可选
            if strings.Contains(line, "@name") {
                label := strings.Trim(strings.Split(line, "@name")[1], " ")
                baseVariableItem.Label = label
                continue
            }
        }
    }
    category := make([]*Route, len(base))
    index := 0
    for _, item := range base {
        category[index] = &Route{
            CnName: item.Label,
            Path:   item.Name,
        }
        index++
    }
    return &Base{
        Base:          category,
        BaseVariables: base,
    }
}

func AnalyzeComponentVariables(variables string) *Component {
    var (
        component                = make(map[string]*ComponentItem)
        componentItem            = NewComponentItem()
        componentCategoryItem    = NewComponentCategoryItem()
        componentPropsItem       = NewComponentPropsItem()
        componentDomItem         = NewComponentDOMItem()
        componentStateItem       = NewComponentStateItem()
        componentVariableItem    = NewComponentVariableItem()
        isIgnore                 = false
        isMultiLineComment       = false
        isProcessingDom          = false
        isProcessingState        = false
        isVariableHide           = false
        isVariableUnconfigurable = false
    )

    lines := strings.Split(variables, "\n")
    for _, item := range lines {
        line := strings.Trim(item, " ")

        // 处理多行注释
        if strings.Contains(line, "/*") {
            isMultiLineComment = true
            continue
        }
        if isMultiLineComment {
            if strings.Contains(line, "*/") {
                isMultiLineComment = false
                continue
            }
        }

        if strings.Contains(line, "@ignore") {
            isIgnore = true
            continue
        }
        if strings.Contains(line, "@end ignore") {
            isIgnore = false
            continue
        }

        if !(NoOp(line) || isIgnore || isMultiLineComment) {
            if strings.HasPrefix(line, "$") && strings.Contains(line, "!default") {
                list := strings.Split(line, ":")
                for index, val := range list {
                    list[index] = strings.Trim(val, " ")
                }
                attribute := strings.Join(strings.Split(list[0], "")[1:], "")
                value := strings.Split(list[1], "!default")[0]
                componentVariableItem.Attribute = attribute
                componentVariableItem.Value = value
                componentVariableItem.Hide = isVariableHide
                componentVariableItem.Unconfigurable = isVariableUnconfigurable
                if componentVariableItem.Label == "" {
                    componentVariableItem.Label = componentVariableItem.Attribute
                }
                if isProcessingState {
                    componentStateItem.Variables = append(componentStateItem.Variables, componentVariableItem)
                } else if isProcessingDom {
                    componentDomItem.Variables = append(componentDomItem.Variables, componentVariableItem)
                } else {
                    componentPropsItem.Variables = append(componentPropsItem.Variables, componentVariableItem)
                }
                componentVariableItem = NewComponentVariableItem()
                continue
            }

            if strings.Contains(line, "@end module") {
                break
            }

            if strings.Contains(line, "@component") {
                lineInfo := NewLineInfo(line, "@component")
                componentItem.Name = lineInfo.GetName()
                componentItem.Label = lineInfo.GetLabel()
                continue
            }

            if strings.Contains(line, "@end component") {
                component[componentItem.Name] = componentItem
                componentItem = NewComponentItem()
                continue
            }

            if strings.Contains(line, "@include") {
                value := strings.Split(strings.Split(line, "@include")[1], ",")
                for index, item := range value {
                    value[index] = strings.Trim(item, " ")
                }
                componentItem.Include = value
                continue
            }

            // 处理第二级变量
            if strings.Contains(line, "@category") {
                lineInfo := NewLineInfo(line, "@category")
                componentCategoryItem.CategoryName = lineInfo.GetName()
                componentCategoryItem.CategoryLabel = lineInfo.GetLabel()
                continue
            }

            if strings.Contains(line, "@end category") {
                componentItem.Category = append(componentItem.Category, componentCategoryItem)
                componentCategoryItem = NewComponentCategoryItem()
                continue
            }

            if strings.Contains(line, "@propsValue") {
                lineInfo := NewLineInfo(line, "@propsValue")
                componentPropsItem.PropsName = lineInfo.GetName()
                componentPropsItem.PropsLabel = lineInfo.GetLabel()
                continue
            }

            if strings.Contains(line, "@end propsValue") {
                componentCategoryItem.Props = append(componentCategoryItem.Props, componentPropsItem)
                componentPropsItem = NewComponentPropsItem()
                continue
            }

            if strings.Contains(line, "@dom") {
                lineInfo := NewLineInfo(line, "@dom")
                componentDomItem.DomName = lineInfo.GetName()
                componentDomItem.DomLabel = lineInfo.GetLabel()
                isProcessingDom = true
                continue
            }

            if strings.Contains(line, "@end dom") {
                componentPropsItem.Dom = append(componentPropsItem.Dom, componentDomItem)
                componentDomItem = NewComponentDOMItem()
                isProcessingDom = false
                continue
            }

            if strings.Contains(line, "@state") {
                lineInfo := NewLineInfo(line, "@state")
                componentStateItem.StateName = lineInfo.GetName()
                componentStateItem.StateLabel = lineInfo.GetLabel()
                isProcessingState = true
                continue
            }

            if strings.Contains(line, "@end state") {
                if isProcessingDom {
                    componentDomItem.DomState = append(componentDomItem.DomState, componentStateItem)
                } else {
                    componentPropsItem.State = append(componentPropsItem.State, componentStateItem)
                }
                isProcessingState = false
                componentStateItem = NewComponentStateItem()
                continue
            }

            // 确定变量是否被隐藏
            if strings.Contains(line, "@hide") {
                isVariableHide = true
                continue
            }
            if strings.Contains(line, "@end hide") {
                isVariableHide = false
                continue
            }

            // 确定变量是否不可配置
            if strings.Contains(line, "@unconfigurable") {
                isVariableUnconfigurable = true
                continue
            }
            if strings.Contains(line, "@end unconfigurable") {
                isVariableUnconfigurable = false
                continue
            }

            // 如果一个变量的值是表达式，通过该注解获取到表达式的值
            if strings.Contains(line, "@value") {
                value := strings.Trim(strings.Split(line, "@value")[1], " ")
                componentVariableItem.ExpressionValue = value
                continue
            }

            // 如果一个变量的值是引用的其他变量，确定该变量的可选范围
            if strings.Contains(line, "@refer") {
                value := strings.Trim(strings.Split(line, "@refer")[1], " ")
                componentVariableItem.Refer = value
                continue
            }

            if strings.Contains(line, "@isolation") {
                componentVariableItem.Isolation = true
            }

            // 变量的中文名，可选
            if strings.Contains(line, "@name") {
                value := strings.Trim(strings.Split(line, "@name")[1], " ")
                componentVariableItem.Label = value
                continue
            }
        }
    }
    value := make([]*Route, len(component))
    index := 0
    for _, item := range component {
        value[index] = &Route{
            CnName: item.Label,
            Path:   item.Name,
        }
        index++
    }
    return &Component{
        Component:          value,
        ComponentVariables: component,
    }
}
