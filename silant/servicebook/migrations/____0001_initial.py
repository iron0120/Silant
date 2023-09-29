
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_factory_number', models.CharField(max_length=4)),
                ('engine_factory_number', models.CharField(max_length=16)),
                ('transmission_factory_number', models.CharField(max_length=10)),
                ('driving_bridge_factory_number', models.CharField(max_length=10)),
                ('controlled_bridge_factory_number', models.CharField(max_length=10)),
                ('supply_contract', models.CharField(max_length=100)),
                ('date_shipment', models.DateField()),
                ('consignee', models.CharField(max_length=100)),
                ('supply_address', models.CharField(max_length=100)),
                ('equipment', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ControlledBridgeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='DrivingBridgeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='EngineModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FailureNode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='RecoveryMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ServiceCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TechniqueModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TransmissionModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TypeOfMaintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_maintenance', models.DateField()),
                ('operating_time', models.IntegerField()),
                ('order_number', models.CharField(max_length=100)),
                ('data_of_order', models.DateField()),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.car')),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.organization')),
                ('service_company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.servicecompany')),
                ('type_of_maintenance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.typeofmaintenance')),
            ],
        ),
        migrations.CreateModel(
            name='Complaints',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_failure', models.DateField()),
                ('operating_time', models.IntegerField()),
                ('spare_parts_used', models.TextField(blank=True, default=None, null=True)),
                ('date_of_recovery', models.DateField()),
                ('equipment_downtime', models.IntegerField(default=None)),
                ('description_of_failure', models.CharField(max_length=100)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.car')),
                ('failure_node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.failurenode')),
                ('recovery_method', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.recoverymethod')),
                ('service_company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.servicecompany')),
            ],
        ),
        migrations.AddField(
            model_name='car',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.client'),
        ),
        migrations.AddField(
            model_name='car',
            name='controlled_bridge_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.controlledbridgemodel'),
        ),
        migrations.AddField(
            model_name='car',
            name='driving_bridge_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.drivingbridgemodel'),
        ),
        migrations.AddField(
            model_name='car',
            name='engine_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.enginemodel'),
        ),
        migrations.AddField(
            model_name='car',
            name='service_company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.servicecompany'),
        ),
        migrations.AddField(
            model_name='car',
            name='technique_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.techniquemodel'),
        ),
        migrations.AddField(
            model_name='car',
            name='transmission_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='servicebook.transmissionmodel'),
        ),
    ]
