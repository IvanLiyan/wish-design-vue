package main

type BaseVariableItem struct {
    Attribute string `json:"attribute"`
    Value string `json:"value"`
    Label string `json:"label"`
    Hide bool `json:"hide"`
    Unconfigurable  bool   `json:"unconfigurable"`
    Unselected      bool   `json:"unselected"`
    ExpressionValue string `json:"expressionValue"`
    Isolation       bool   `json:"isolation"`
}

func NewBaseVariableItem() *BaseVariableItem {
    return &BaseVariableItem{}
}

func NewBaseVariables() []*BaseVariableItem {
    return make([]*BaseVariableItem, 0)
}

type ComponentVariableItem struct {
    Attribute string `json:"attribute"`
    Value string `json:"value"`
    Label string `json:"label"`
    Hide bool `json:"hide"`
    Unconfigurable bool `json:"unconfigurable"`
    ExpressionValue string `json:"expressionValue"`
    Refer     string `json:"refer"`
    Isolation bool   `json:"isolation"`
}
func NewComponentVariableItem() *ComponentVariableItem {
    return &ComponentVariableItem{}
}

func NewComponentVariables() []*ComponentVariableItem {
    return make([]*ComponentVariableItem, 0)
}

type ComponentStateItem struct {
    StateName  string                  `json:"stateName"`
    StateLabel string                  `json:"stateLabel"`
    Variables  []*ComponentVariableItem `json:"variables"`
}

func NewComponentStateItem() *ComponentStateItem {
    return &ComponentStateItem{
        Variables: NewComponentVariables(),
    }
}

type ComponentDOMItem struct {
    DomName   string                  `json:"domName"`
    DomLabel  string                  `json:"domLabel"`
    DomState  []*ComponentStateItem    `json:"domState"`
    Variables []*ComponentVariableItem `json:"variables"`
}

func NewComponentDOMItem() *ComponentDOMItem {
    return &ComponentDOMItem{
        DomState: make([]*ComponentStateItem, 0),
        Variables: NewComponentVariables(),
    }
}

type ComponentPropsItem struct {
    PropsName  string                  `json:"propsName"`
    PropsLabel string                  `json:"propsLabel"`
    Variables  []*ComponentVariableItem `json:"variables"`
    State      []*ComponentStateItem    `json:"state"`
    Dom        []*ComponentDOMItem      `json:"dom"`
}

func NewComponentPropsItem() *ComponentPropsItem {
    return &ComponentPropsItem{
        Variables: NewComponentVariables(),
        State: make([]*ComponentStateItem, 0),
        Dom: make([]*ComponentDOMItem, 0),
    }
}

type BaseCategoryItem struct {
    CategoryName  string             `json:"categoryName"`
    CategoryLabel string             `json:"categoryLabel"`
    Variables     []*BaseVariableItem `json:"variables"`
}

func NewBaseCategoryItem() *BaseCategoryItem {
    return &BaseCategoryItem{
        Variables: NewBaseVariables(),
    }
}

type ComponentCategoryItem struct {
    CategoryName  string               `json:"categoryName"`
    CategoryLabel string               `json:"categoryLabel"`
    Props         []*ComponentPropsItem `json:"props"`
}

func NewComponentCategoryItem() *ComponentCategoryItem {
    return &ComponentCategoryItem{
        Props: make([]*ComponentPropsItem, 0),
    }
}


type BaseItem struct {
    Name     string             `json:"name"`
    Label    string             `json:"label"`
    Category []*BaseCategoryItem `json:"category"`
}

func NewBaseItem() *BaseItem {
    return &BaseItem{
        Category: make([]*BaseCategoryItem, 0),
    }
}

type ComponentItem struct {
    Name     string                  `json:"name"`
    Label    string                  `json:"label"`
    Include  []string                `json:"include"`
    Category []*ComponentCategoryItem `json:"category"`
}

func NewComponentItem() *ComponentItem {
    return &ComponentItem{
        Include: make([]string, 0),
        Category: make([]*ComponentCategoryItem, 0),
    }
}

type Route struct {
    Path   string `json:"path"`
    CnName string `json:"cnName"`
}

type Base struct {
    Base          []*Route             `json:"base"`
    BaseVariables map[string]*BaseItem `json:"baseVariables"`
}

type Component struct {
    Component          []*Route                  `json:"component"`
    ComponentVariables map[string]*ComponentItem `json:"componentVariables"`
}

type ComponentProp struct {
    Base               []*Route                  `json:"base"`
    BaseVariables      map[string]*BaseItem      `json:"baseVariables"`
    Component          []*Route                  `json:"component"`
    ComponentVariables map[string]*ComponentItem `json:"componentVariables"`
}

