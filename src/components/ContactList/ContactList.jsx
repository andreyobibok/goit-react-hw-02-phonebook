import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, removeContact }) => {
    const names = contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
            {name}: {number}
            <button
                className={css.button}
                onClick={() => removeContact(id)}
                type="button"
            >
                Delete
            </button>
        </li>
    ));

    return (
        <div>
            <ul className={css.list}>{names}</ul>
        </div>
    );
};

export default ContactList;

ContactList.propTypes = {
    removeContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
};