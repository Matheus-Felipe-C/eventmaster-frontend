import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPinIcon } from 'lucide-react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import styles from './styles.module.css';

// Corrige o ícone padrão do Leaflet que quebra com bundlers como o Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Coordinates = {
    lat: number;
    lng: number;
};

type MapProps = {
    /** Endereço textual do evento (ex: "Estádio do Maracanã, Rio de Janeiro") */
    location: string;
    /** Altura do mapa. Padrão: "35rem" */
    height?: string;
};

async function geocodeLocation(location: string): Promise<Coordinates | null> {
    try {
        const encoded = encodeURIComponent(location);
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`,
            {
                headers: {
                    'Accept-Language': 'pt-BR',
                },
            }
        );
        const data = await res.json();
        if (data.length === 0) return null;
        return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
        };
    } catch {
        return null;
    }
}

export function Map({ location, height = '35rem' }: MapProps) {
    const [coords, setCoords] = useState<Coordinates | null>(null);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
        'loading'
    );

    useEffect(() => {
        geocodeLocation(location).then((result) => {
            if (result) {
                setCoords(result);
                setStatus('success');
            } else {
                setCoords(null);
                setStatus('error');
            }
        });
    }, [location]);

    if (status === 'loading') {
        return (
            <div className={styles.placeholder} style={{ height }}>
                <div className={styles.loadingContent}>
                    <div className={styles.spinner} />
                    <p className={styles.loadingText}>Carregando mapa...</p>
                </div>
            </div>
        );
    }

    if (status === 'error' || !coords) {
        return (
            <div className={styles.placeholder} style={{ height }}>
                <div className={styles.errorContent}>
                    <MapPinIcon className={styles.errorIcon} />
                    <p className={styles.errorText}>
                        Não foi possível encontrar o endereço no mapa.
                    </p>
                    <span className={styles.errorLocation}>{location}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper} style={{ height }}>
            <MapContainer
                center={[coords.lat, coords.lng]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coords.lat, coords.lng]}>
                    <Popup>{location}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}