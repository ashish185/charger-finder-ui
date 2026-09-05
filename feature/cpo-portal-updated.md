```As a developer I want to have cpo portal```
- Once the user login
- if the user role is operator
- then open the cpo portal

**Backend**
- Development server backend running at http:localhost:5000
Operator Stations

POST
/operator/stations
Create a station owned by the authenticated operator.


GET
/operator/stations
List the authenticated operator's stations.


GET
/operator/stations/{stationId}
Get an owned station and its chargers.


POST
/operator/stations/{stationId}/chargers
Add a charger to an owned station.

**Frontend**
- http://localhost:3000/dashboard
- design: [text](<../stitch_chargefinder_app_user_flow (3)>)
- Update the UI fields by your own, add by yourself, backend is source of truth.
