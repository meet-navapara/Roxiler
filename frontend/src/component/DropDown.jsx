import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropDown({onchange}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu onChange={onchange}>
        <Dropdown.Item name="month" value="abc" onChange={onchange}>Action</Dropdown.Item>
        <Dropdown.Item name="month" value="abc" onChange={onchange}>Another action</Dropdown.Item>
        <Dropdown.Item name="month" value="abc" onChange={onchange}>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;