import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ handleChange, value }) => {
    return (
        <div className={css.wrapper}>
            <label>Find contacts by name</label>
            <input
                className={css.input}
                onChange={handleChange}
                name="filter"
                type="text"
                value={value}
                placeholder="Search Contact"
            />
        </div>
    );
};

export default Filter;

Filter.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};