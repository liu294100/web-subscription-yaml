'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('admin_password');
    if (stored) {
      setPassword(stored);
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_password', password);
    setIsAuthorized(true);
  };

  if (!mounted) return null;

  if (!isAuthorized) {
    return (
      <div className="container mx-auto py-20 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Please enter the admin password to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Background System</h1>
        <Button variant="outline" onClick={() => {
          localStorage.removeItem('admin_password');
          setIsAuthorized(false);
          setPassword('');
        }}>Logout</Button>
      </div>
      <Tabs defaultValue="clash" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="clash">Clash YAML Manager</TabsTrigger>
          <TabsTrigger value="override">Override Generator</TabsTrigger>
          <TabsTrigger value="proxies">Global Proxies</TabsTrigger>
        </TabsList>
        <TabsContent value="clash">
          <ClashManager password={password} />
        </TabsContent>
        <TabsContent value="override">
          <OverrideGenerator password={password} />
        </TabsContent>
        <TabsContent value="proxies">
          <GlobalProxiesManager password={password} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ClashManager({ password }: { password: string }) {
  // ... existing code ...
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchFiles = async () => {
    const res = await fetch('/api/admin/upload-clash', {
      headers: { 'Authorization': `Bearer ${password}` }
    });
    if (res.ok) {
      setFiles(await res.json());
    } else if (res.status === 401) {
      toast.error('Unauthorized. Please check your password.');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [password]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;
    
    if (!file) return;

    const text = await file.text();
    
    const res = await fetch('/api/admin/upload-clash', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        content: text,
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
    });

    if (res.ok) {
      toast.success('File uploaded successfully');
      fetchFiles();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error('Failed to upload file');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    const res = await fetch(`/api/admin/upload-clash?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${password}` }
    });

    if (res.ok) {
      toast.success('File deleted');
      fetchFiles();
    } else {
      toast.error('Failed to delete file');
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;
    
    let content = '';
    if (file && file.size > 0) {
        content = await file.text();
    } else {
        // Fallback to text area if needed, but per request we use upload
        // content = formData.get('content') as string;
        toast.error('Please select a file to update');
        setLoading(false);
        return;
    }
    
    const res = await fetch('/api/admin/upload-clash', {
      method: 'PUT',
      body: JSON.stringify({
        id: editingItem.id,
        content,
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
    });

    if (res.ok) {
      toast.success('File updated successfully');
      fetchFiles();
      setIsDialogOpen(false);
      setEditingItem(null);
    } else {
      toast.error('Failed to update file');
    }
    setLoading(false);
  };

  const openEdit = (file: any) => {
    setEditingItem(file);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Clash YAML</DialogTitle>
            <DialogDescription>
              Upload a new file to replace the content of <strong>{editingItem?.filename}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="update-file">Select New YAML File</Label>
              <Input id="update-file" name="file" type="file" accept=".yaml,.yml" required />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update File'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Upload Clash YAML</CardTitle>
          <CardDescription>Upload and store Clash configuration files.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="flex gap-4 items-end">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">YAML File</Label>
              <Input id="file" name="file" type="file" accept=".yaml,.yml" required />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stored Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.filename}</TableCell>
                  <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={`/api/admin/download-raw?id=${file.id}${password ? `&pwd=${password}` : ''}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Raw
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          const url = `${window.location.origin}/api/admin/download-raw?id=${file.id}${password ? `&pwd=${password}` : ''}`;
                          navigator.clipboard.writeText(url);
                          toast.success('Raw link copied!');
                        }}
                      >
                        Copy Raw
                      </Button>

                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={`/api/admin/convert-stored?id=${file.id}${password ? `&pwd=${password}` : ''}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Convert
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          const url = `${window.location.origin}/api/admin/convert-stored?id=${file.id}${password ? `&pwd=${password}` : ''}`;
                          navigator.clipboard.writeText(url);
                          toast.success('Convert link copied!');
                        }}
                      >
                        Copy Convert
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => openEdit(file)}>
                        Update
                      </Button>

                      <Button variant="destructive" size="sm" onClick={() => handleDelete(file.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {files.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No files found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function OverrideGenerator({ password }: { password: string }) {
  // ... existing code ...
  const [overrides, setOverrides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchOverrides = async () => {
    const res = await fetch('/api/admin/overrides', {
      headers: { 'Authorization': `Bearer ${password}` }
    });
    if (res.ok) {
      setOverrides(await res.json());
    }
  };

  useEffect(() => {
    fetchOverrides();
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const proxiesText = formData.get('proxies') as string;
    // Enhanced proxy parsing
    const proxies = proxiesText.split('\n')
      .map(line => {
        let clean = line.trim();
        // Remove leading dash and space (e.g., "- Proxy")
        if (clean.startsWith('-')) {
          clean = clean.substring(1).trim();
        }
        // Remove surrounding quotes if both match
        if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
          clean = clean.substring(1, clean.length - 1);
        }
        return clean;
      })
      .filter(p => p);

    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      ruleUrl: formData.get('ruleUrl'),
      proxies,
      id: editingItem?.id // Include ID if editing
    };

    const method = editingItem ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/overrides', {
      method,
      body: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
    });

    if (res.ok) {
      toast.success(editingItem ? 'Override updated' : 'Override created');
      fetchOverrides();
      setIsDialogOpen(false);
      setEditingItem(null);
    } else {
      toast.error(editingItem ? 'Failed to update' : 'Failed to create');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this override?')) return;
    
    const res = await fetch(`/api/admin/overrides?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${password}` }
    });

    if (res.ok) {
      toast.success('Override deleted');
      fetchOverrides();
    } else {
      toast.error('Failed to delete override');
    }
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Overrides</h2>
        <Button onClick={openCreate}>Create New Override</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Override' : 'Create New Override'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the existing override configuration.' : 'Generate a new Stash override configuration.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="e.g. TikTok" 
                  defaultValue={editingItem?.name}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  name="description" 
                  placeholder="e.g. TikTok Split Rules" 
                  defaultValue={editingItem?.description}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ruleUrl">Rule Source URL</Label>
              <Input 
                id="ruleUrl" 
                name="ruleUrl" 
                placeholder="https://raw.githubusercontent.com/..." 
                defaultValue={editingItem?.ruleUrl}
                required 
              />
              <p className="text-sm text-muted-foreground">
                The URL to the remote rule file (e.g. Github Raw URL).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proxies">Node List (One per line)</Label>
              <Textarea 
                id="proxies" 
                name="proxies" 
                placeholder={`"🔰 手动选择"\n"🎯 Direct"\nCanada A01`}
                className="h-32"
                defaultValue={editingItem?.proxies?.join('\n')}
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to use Global Proxies.
              </p>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (editingItem ? 'Update Override' : 'Create Override')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overrides.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a 
                              href={`/api/admin/overrides/${item.id}/download${password ? `?pwd=${password}` : ''}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                                Download
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            const url = `${window.location.origin}/api/admin/overrides/${item.id}/download${password ? `?pwd=${password}` : ''}`;
                            navigator.clipboard.writeText(url);
                            toast.success('Link copied!');
                        }}>
                            Copy Link
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                            Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                            Delete
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {overrides.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No overrides found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function GlobalProxiesManager({ password }: { password: string }) {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchSources = async () => {
    const res = await fetch('/api/admin/global-proxies', {
      headers: { 'Authorization': `Bearer ${password}` }
    });
    if (res.ok) {
      setSources(await res.json());
    }
  };

  useEffect(() => {
    fetchSources();
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const proxiesText = formData.get('proxies') as string;
    // Enhanced proxy parsing
    const proxies = proxiesText.split('\n')
      .map(line => {
        let clean = line.trim();
        // Remove leading dash and space (e.g., "- Proxy")
        if (clean.startsWith('-')) {
          clean = clean.substring(1).trim();
        }
        // Remove surrounding quotes if both match
        if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
          clean = clean.substring(1, clean.length - 1);
        }
        return clean;
      })
      .filter(p => p);

    const data = {
      name: formData.get('name'),
      proxies,
      priority: formData.get('priority'),
      id: editingItem?.id
    };

    const method = editingItem ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/global-proxies', {
      method,
      body: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
    });

    if (res.ok) {
      toast.success(editingItem ? 'Source updated' : 'Source added');
      fetchSources();
      setIsDialogOpen(false);
      setEditingItem(null);
    } else {
      toast.error('Failed to save source');
    }
    setLoading(false);
  };

  const handleToggle = async (id: number, current: boolean) => {
    const res = await fetch('/api/admin/global-proxies', {
      method: 'PUT',
      body: JSON.stringify({ id, isEnabled: !current }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
    });

    if (res.ok) {
      setSources(sources.map(p => p.id === id ? { ...p, isEnabled: !current } : p));
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this source?')) return;
    const res = await fetch(`/api/admin/global-proxies?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${password}` }
    });

    if (res.ok) {
      setSources(sources.filter(p => p.id !== id));
      toast.success('Source deleted');
    } else {
      toast.error('Failed to delete source');
    }
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const getProxyCount = (proxies: any) => {
    if (Array.isArray(proxies)) return proxies.length;
    if (typeof proxies === 'string') return proxies.split('\n').filter(line => line.trim()).length;
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Proxy Sources</h2>
        <Button onClick={openCreate}>Add New Source</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Source' : 'Add New Source'}</DialogTitle>
            <DialogDescription>
              Manage a collection of proxies as a single source. Lower priority number means higher priority.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="name">Source Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="e.g. Premium Node List" 
                    defaultValue={editingItem?.name}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Input 
                    id="priority" 
                    name="priority" 
                    type="number"
                    placeholder="0" 
                    defaultValue={editingItem?.priority ?? 0}
                    required 
                  />
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="proxies">Node List (One per line)</Label>
              <Textarea 
                id="proxies" 
                name="proxies" 
                placeholder={`"🔰 手动选择"\n"🎯 Direct"\nCanada A01`}
                className="h-64"
                defaultValue={Array.isArray(editingItem?.proxies) ? editingItem.proxies.join('\n') : editingItem?.proxies}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (editingItem ? 'Update Source' : 'Add Source')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Manage Global Sources</CardTitle>
          <CardDescription>These sources will be used when an override has no specific nodes configured.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>{source.priority}</TableCell>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>{getProxyCount(source.proxies)} nodes</TableCell>
                  <TableCell>
                    <Switch 
                      checked={source.isEnabled} 
                      onCheckedChange={() => handleToggle(source.id, source.isEnabled)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(source)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(source.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sources.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No sources found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
