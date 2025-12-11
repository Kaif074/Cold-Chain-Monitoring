import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Plus, Trash2, Download, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { dataService } from '@/services/dataService';

interface TelemetryRecord {
  timestamp: string;
  device_id: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  pressure: number;
  speed: number;
  course_deg: number;
  door_status: string;
}

const DataUpload = () => {
  const [telemetryRecords, setTelemetryRecords] = useState<TelemetryRecord[]>([]);
  const [currentRecord, setCurrentRecord] = useState<Partial<TelemetryRecord>>({
    device_id: 'truck_01',
    door_status: 'closed',
    speed: 0,
    course_deg: 0,
  });

  const [jsonInput, setJsonInput] = useState('');

  const handleGenerateSampleRoute = () => {
    const start = { lat: 28.6139, lng: 77.2090 };
    const end = { lat: 26.9124, lng: 75.7873 };
    const points = 120;
    const deviceId = 'truck_01';

    const records: TelemetryRecord[] = Array.from({ length: points }, (_, i) => {
      const t = i / (points - 1);
      const lat = start.lat + (end.lat - start.lat) * t;
      const lng = start.lng + (end.lng - start.lng) * t;
      const tempBase = 5;
      const temp = tempBase + Math.sin(i / 10) * 1.5 + (Math.random() - 0.5) * 0.8;
      const humBase = 68;
      const humidity = humBase + Math.sin(i / 12) * 6 + (Math.random() - 0.5) * 3;
      const presBase = 101.3;
      const pressure = presBase + Math.sin(i / 15) * 0.6 + (Math.random() - 0.5) * 0.3;
      const speed = Math.max(0, 30 + Math.sin(i / 8) * 20 + (Math.random() - 0.5) * 10);
      const course = 210;
      const door = i % 35 === 0 ? 'open' : 'closed';
      const timestamp = new Date(Date.now() - (points - i) * 60_000).toISOString();
      return {
        timestamp,
        device_id: deviceId,
        latitude: Number(lat.toFixed(6)),
        longitude: Number(lng.toFixed(6)),
        temperature: Number(temp.toFixed(2)),
        humidity: Number(humidity.toFixed(2)),
        pressure: Number(pressure.toFixed(2)),
        speed: Number(speed.toFixed(2)),
        course_deg: course,
        door_status: door,
      };
    });

    setTelemetryRecords(records);
    localStorage.setItem('custom_telemetry_data', JSON.stringify(records));
    try { dataService.clearCache(); } catch {}
    window.dispatchEvent(new Event('custom-data-updated'));
    toast.success(`Generated ${records.length} sample records`);
  };

  const handleAddRecord = () => {
    if (!currentRecord.latitude || !currentRecord.longitude || 
        !currentRecord.temperature || !currentRecord.humidity || !currentRecord.pressure) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newRecord: TelemetryRecord = {
      timestamp: new Date().toISOString(),
      device_id: currentRecord.device_id || 'truck_01',
      latitude: Number(currentRecord.latitude),
      longitude: Number(currentRecord.longitude),
      temperature: Number(currentRecord.temperature),
      humidity: Number(currentRecord.humidity),
      pressure: Number(currentRecord.pressure),
      speed: Number(currentRecord.speed) || 0,
      course_deg: Number(currentRecord.course_deg) || 0,
      door_status: currentRecord.door_status || 'closed',
    };

    setTelemetryRecords([...telemetryRecords, newRecord]);
    toast.success('Record added successfully');
    
    // Reset form but keep device_id
    setCurrentRecord({
      device_id: currentRecord.device_id,
      door_status: 'closed',
      speed: 0,
      course_deg: 0,
    });
  };

  const handleRemoveRecord = (index: number) => {
    const updated = telemetryRecords.filter((_, i) => i !== index);
    setTelemetryRecords(updated);
    toast.success('Record removed');
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(telemetryRecords, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'telemetry-data.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Data downloaded successfully');
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        setTelemetryRecords(parsed);
        localStorage.setItem('custom_telemetry_data', JSON.stringify(parsed));
        try {
          dataService.clearCache();
        } catch {}
        window.dispatchEvent(new Event('custom-data-updated'));
        toast.success(`Imported ${parsed.length} records`);
        setJsonInput('');
      } else {
        toast.error('JSON must be an array of records');
      }
    } catch (error) {
      toast.error('Invalid JSON format');
    }
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('custom_telemetry_data', JSON.stringify(telemetryRecords));
    toast.success('Data saved to browser storage');
    try {
      dataService.clearCache();
    } catch {}
    window.dispatchEvent(new Event('custom-data-updated'));
  };

  const handleLoadFromLocalStorage = () => {
    const saved = localStorage.getItem('custom_telemetry_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTelemetryRecords(parsed);
        toast.success(`Loaded ${parsed.length} records`);
        try {
          dataService.clearCache();
        } catch {}
        window.dispatchEvent(new Event('custom-data-updated'));
      } catch (error) {
        toast.error('Failed to load saved data');
      }
    } else {
      toast.info('No saved data found');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
          <p className="text-muted-foreground">Add your own telemetry data for monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLoadFromLocalStorage}>
            <Upload className="h-4 w-4 mr-2" />
            Load Saved
          </Button>
          <Button variant="outline" onClick={handleGenerateSampleRoute}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Sample Route
          </Button>
          <Button variant="outline" onClick={handleSaveToLocalStorage} disabled={telemetryRecords.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Save Data
          </Button>
          <Button onClick={handleDownloadJSON} disabled={telemetryRecords.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
        </div>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="json">JSON Import</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Telemetry Record</CardTitle>
              <CardDescription>
                Enter temperature, humidity, pressure, and location data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device_id">Device ID</Label>
                  <Input
                    id="device_id"
                    value={currentRecord.device_id}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, device_id: e.target.value })}
                    placeholder="truck_01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="door_status">Door Status</Label>
                  <select
                    id="door_status"
                    value={currentRecord.door_status}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, door_status: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="closed">Closed</option>
                    <option value="open">Open</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude *</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.000001"
                      value={currentRecord.latitude || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, latitude: parseFloat(e.target.value) })}
                      placeholder="37.7749"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude *</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.000001"
                      value={currentRecord.longitude || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, longitude: parseFloat(e.target.value) })}
                      placeholder="-122.4194"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="speed">Speed (km/h)</Label>
                    <Input
                      id="speed"
                      type="number"
                      step="0.1"
                      value={currentRecord.speed || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, speed: parseFloat(e.target.value) })}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course_deg">Course (degrees)</Label>
                    <Input
                      id="course_deg"
                      type="number"
                      min="0"
                      max="360"
                      value={currentRecord.course_deg || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, course_deg: parseFloat(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3">Sensor Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C) *</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      value={currentRecord.temperature || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, temperature: parseFloat(e.target.value) })}
                      placeholder="5.0"
                    />
                    <p className="text-xs text-muted-foreground">Safe range: 2-8°C</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%) *</Label>
                    <Input
                      id="humidity"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={currentRecord.humidity || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, humidity: parseFloat(e.target.value) })}
                      placeholder="65.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressure">Pressure (kPa) *</Label>
                    <Input
                      id="pressure"
                      type="number"
                      step="0.1"
                      value={currentRecord.pressure || ''}
                      onChange={(e) => setCurrentRecord({ ...currentRecord, pressure: parseFloat(e.target.value) })}
                      placeholder="101.3"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleAddRecord} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </CardContent>
          </Card>

          {telemetryRecords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Added Records ({telemetryRecords.length})</CardTitle>
                <CardDescription>Review and manage your telemetry data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {telemetryRecords.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Location:</span>
                          <br />
                          <span className="font-mono">{record.latitude.toFixed(4)}, {record.longitude.toFixed(4)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temp:</span>
                          <br />
                          <span className={record.temperature < 2 || record.temperature > 8 ? 'text-critical' : 'text-success'}>
                            {record.temperature}°C
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Humidity:</span>
                          <br />
                          <span>{record.humidity}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pressure:</span>
                          <br />
                          <span>{record.pressure} kPa</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRecord(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="json" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Import JSON Data</CardTitle>
              <CardDescription>
                Paste your telemetry data in JSON format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="json-input">JSON Data</Label>
                <Textarea
                  id="json-input"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`[\n  {\n    "timestamp": "2024-12-10T08:00:00Z",\n    "device_id": "truck_01",\n    "latitude": 37.7749,\n    "longitude": -122.4194,\n    "temperature": 5.2,\n    "humidity": 65.5,\n    "pressure": 101.3,\n    "speed": 45.5,\n    "course_deg": 180,\n    "door_status": "closed"\n  }\n]`}
                  className="font-mono text-sm min-h-[300px]"
                />
              </div>
              <Button onClick={handleImportJSON} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Import JSON
              </Button>
            </CardContent>
          </Card>

          {telemetryRecords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Current Data Preview</CardTitle>
                <CardDescription>
                  {telemetryRecords.length} records loaded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
                  {JSON.stringify(telemetryRecords, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Add multiple records to create a route from start to destination</li>
            <li>Temperature safe range is 2-8°C (values outside will trigger alerts)</li>
            <li>Use Google Maps to get latitude/longitude coordinates</li>
            <li>Download JSON to use in the main dashboard</li>
            <li>Save data to browser storage to persist between sessions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;
