import { PuffLoader } from 'react-spinners';
import { DotPulse } from 'ldrs/react';
import 'ldrs/react/DotPulse.css';

const Loader = ({ type = 'puff', size = 30, color = '#00D09C' }) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-3">
            {type === 'puff' ? (
                <PuffLoader size={size} color={color} />
            ) : type === 'dot' ? (
                <DotPulse size={size} color={"#CFE2FF"} speed={1.5} />
            ) : null}
        </div>
    );
};

export default Loader;
