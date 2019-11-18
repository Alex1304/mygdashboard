import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faKey, faStar, faTrophy, faMusic } from '@fortawesome/free-solid-svg-icons'

function icons() {
    library.add(faUser);
    library.add(faKey);
    library.add(faStar);
    library.add(faTrophy);
    library.add(faMusic);
}

export default icons;
