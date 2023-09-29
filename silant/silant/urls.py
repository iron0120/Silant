from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from servicebook.views import *
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'service_companies', ServiceCompanyViewset)
router.register(r'technic_models', TechnicModelViewset)
router.register(r'transmission_models', TransmissionModelViewset)
router.register(r'engine_models', EngineModelViewset)
router.register(r'driving_bridge_models', DrivingBridgeModelViewset)
router.register(r'controlled_bridge_models', ControlledBridgeModelViewset)
router.register(r'types_of_maintenance', TypeOfMaintenanceViewset)
router.register(r'recovery_methods', RecoveryMethodViewset)
router.register(r'machines', MachineViewset)
router.register(r'maintenances', MaintenanceViewset)
router.register(r'complaints', ComplaintsViewset)
router.register(r'clients', ClientViewset)
router.register(r'organizations', OrganizationViewset)
router.register(r'failure_nodes', FailureNodeViewset)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user', user, name='user'),
    path('api/login', issue_token, name='issue_token'),
    path('api/logout', UserLogout.as_view(), name='logout'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
