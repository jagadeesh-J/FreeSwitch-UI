import React from 'react';
import { Tree } from 'antd';
import { Container } from 'react-bootstrap';

let parentKey = '';

class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: this.props.treeData,
        };
    }

    onSelect = (selectedKeys) => {
        // console.log('selected', selectedKeys);
        const dataKeys = ['supersuite', 'suite', 'group', 'testname'];
        const data = {
            selection: selectedKeys.length > 0,
        }
        if (selectedKeys.length) {
            const index = selectedKeys[selectedKeys.length-1].split('__');
            index.map((item, i) => {
                return data[dataKeys[i]] = item;
            })
        }
        this.props.handleTreeSelect(data);
    };

    renderTreeNodes = (treeData) => (
        treeData.forEach((item, i) => {
            if(i===0 && item.isLeaf)
                parentKey = item.key;
            if (i===0 && item.children && !item.isLeaf)
                this.renderTreeNodes(item.children);
        })
    )
    componentDidMount() {
        const defaultSelectedKey = this.state.treeData ? [this.state.treeData[0].key] : [];
        this.onSelect(defaultSelectedKey);
    }
    render() {
        this.renderTreeNodes(this.state.treeData);
        const defaultSelectedKey = this.state.treeData ? [this.state.treeData[0].key] : [];
        return (
            <Container className='card h-100 overflow-auto shadow-sm'>
                <Tree
                    showLine
                    treeData={this.state.treeData}
                    onSelect={this.onSelect}
                    defaultSelectedKeys={defaultSelectedKey}
                    defaultExpandedKeys={[parentKey]}
                >
                </Tree>
            </Container>
        );
    }
}

export default TreeView;
