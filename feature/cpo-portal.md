```As a developer I want to have cpo portal```
- Once the user login
- if the user role is operator
- then open the cpo portal

**Backend**
- Development server backend running at http:localhost:5000
Cpo Stations


POST
/cpo/stations
Create a station owned by the authenticated cpo.


GET
/cpo/stations
List the authenticated cpo's stations.


GET
/cpo/stations/{stationId}
Get an owned station and its chargers.


PUT
/cpo/stations/{stationId}
Update station metadata.


PATCH
/cpo/stations/{stationId}
Partial

**Frontend**
- http://localhost:3000/dashboard
- design: [text](<../stitch_chargefinder_app_user_flow (3)>)