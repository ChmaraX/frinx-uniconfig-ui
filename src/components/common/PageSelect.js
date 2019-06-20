import React, {Component} from 'react';
import Pagination from "react-bootstrap/Pagination";

class PageSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    setPages() {
        let output = [];
        let viewedPage = this.props.viewedPage;
        let pagesCount = this.props.count;
        output.push(
            <Pagination.Prev key={'prev'} disabled={viewedPage === 1 || pagesCount === 0}
                             onClick={(e) => {
                                 if (viewedPage !== 1 && pagesCount !== 0)
                                     this.props.handler(viewedPage - 1);
                             }}
            />
        );
        for (let i = 1; i <= pagesCount; i++) {
            if (i >= viewedPage - 2 && i <= viewedPage + 2) {
                output.push(
                    <Pagination.Item key={i} active={viewedPage === i}
                                     onClick={(e) =>
                                         this.props.handler(i)
                                     }
                    > {i} </Pagination.Item>
                )
            }
        }
        output.push(
            <Pagination.Next key={'next'} disabled={viewedPage === pagesCount || pagesCount === 0}
                             onClick={(e) => {
                                 if (viewedPage !== pagesCount && pagesCount !== 0) {
                                     this.props.handler(viewedPage + 1);
                                 }
                             }}
            />
        );
        return output;
    }
    render() {
        return(
            <Pagination style={{float: "right"}}>{this.setPages()}</Pagination>
        )
    }
}

export default PageSelect