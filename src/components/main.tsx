import React, {Component} from 'react'
import HeaderContainer from './layouts/header/index'

class Main extends Component<any, any> {
    constructor(props? : any) {
        super(props);
        console.log(props)
    }

    componentDidMount(): void {

    }

    render(): React.ReactNode {
        return (
            <div>
                {/*TODO Header Component 이벤트 혹은 필요한 상태 전달.*/}
                <HeaderContainer />
            </div>
        )

    }
}

export default Main


