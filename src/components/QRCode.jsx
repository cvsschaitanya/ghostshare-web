import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { key as keystr, setKey, setKeyChangeListener, downloadKeyFile } from '../services/firebase';

const Code = () => {
	const [ keyString, setKeyString ] = useState(keystr);
	console.log(keyString);
	const [ downloading, setDownloading ] = useState(false);

	useEffect(
		() => {
			setKeyChangeListener((snapshot) => {
				downloadKeyFile(snapshot.val());
			});
		},
		[ keyString ]
	);

	return !downloading ? 
        <React.Fragment>
            <QRCode value={keyString} /> 
            <div>{keyString}</div>
        </React.Fragment>
        : 'Downloading';
};

export default Code;
