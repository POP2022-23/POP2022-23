import React from 'react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

interface Props {
    text?: string | undefined
}

const LocationPin = ({text = undefined}: Props) => (
    <div>
        <Icon icon={locationIcon} className="pin-icon"/>
        {text && <p className="pin-text">{text}</p>} 
    </div>
)

export default LocationPin;