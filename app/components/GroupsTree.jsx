import React from 'react';
import classnames from 'classnames';

export default class GroupsTree extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.selectedGroup === null && !newProps.groups.isEmpty()) {
            newProps.selectGroup(newProps.groups.get(0).get('uuid'));
        }
    }

    renderCreateGroupButton() {
        // FIXME group name
        if (this.props.selectedGroup !== null) {
            return <button
                className="uk-button uk-button-primary uk-float-right"
                onClick={() => this.props.createGroup('*FIXME*')}>
                New group
            </button>
        } else {
            return null;
        }
    }

    renderSubGroup(groups, level = 0) {
        if (!groups) {
            return null;
        }

        return <ul className="uk-nav uk-nav-sub uk-nav-side">
            {groups.map(item => {
                const expandGroup = () => this.props.toggleGroupExpand(item.get('uuid'));
                const isExpanded = item.get('isExpanded') || level === 0;
                const hasGroups = item.get('groups').size > 0;
                const itemClasses = classnames({
                    'uk-active': item.get('uuid') === this.props.selectedGroup,
                    'uk-open': isExpanded,
                    'uk-parent': true
                });
                const iconClasses = classnames({
                    'uk-icon-justify': true,
                    'uk-float-right': true,
                    'uk-icon-angle-down': item.get('groups').size > 0 && isExpanded,
                    'uk-icon-angle-left': item.get('groups').size > 0 && !isExpanded
                });

                const icon = <i className={iconClasses} onClick={expandGroup}></i>;

                return <li className={itemClasses} key={item.get('uuid')}>
                    <a onClick={() => this.props.selectGroup(item.get('uuid'))} onDoubleClick={expandGroup}>
                        {`${item.get('name')} ${item.get('entriesCount') ? '[' + item.get('entriesCount') + ']' : ''}`}
                        {hasGroups ? icon : null}
                    </a>
                    {isExpanded && hasGroups ? this.renderSubGroup(item.get('groups'), level + 1) : null}
                </li>
            })}
        </ul>
    }

    render() {
        return <div>
            {this.renderSubGroup(this.props.groups)}
            {this.renderCreateGroupButton()}
        </div>
    }
};
