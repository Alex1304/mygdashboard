import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faKey, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons'

function icons() {
    library.add(faUser);
    library.add(faKey);
    library.add(faStar);
    library.add(faTrophy);
}

export default icons;
