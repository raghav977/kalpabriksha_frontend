'use client';

import { useState, useEffect } from 'react';
import { useSiteConfigs, useUpsertSiteConfig, useDeleteSiteConfig, useBulkUpdateSiteConfigs } from '@/hooks/api/useSiteConfig';
import { PageHeader, PageLoading, ErrorState, ConfirmModal } from '@/components/admin';
import { Save, Plus, Trash2, Edit2, X, Check, Settings, Globe, Mail, Image, BarChart3 } from 'lucide-react';
import { SiteConfig } from '@/lib/api';

// Config categories
const categories = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'hero', label: 'Hero/Homepage', icon: Image },
  { id: 'social', label: 'Social Media', icon: Globe },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
];

// Type options
const typeOptions = [
  { value: 'string', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Yes/No' },
  { value: 'json', label: 'JSON' },
];

export default function AdminSettingsPage() {
  const { data, isLoading, error, refetch } = useSiteConfigs();
  const upsertMutation = useUpsertSiteConfig();
  const deleteMutation = useDeleteSiteConfig();
  const bulkUpdateMutation = useBulkUpdateSiteConfigs();
  
  const [activeCategory, setActiveCategory] = useState('general');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const [newConfig, setNewConfig] = useState({
    key: '',
    value: '',
    type: 'string' as 'string' | 'json' | 'number' | 'boolean',
    category: 'general',
    description: '',
  });

  const configs = data?.raw || [];
  const filteredConfigs = configs.filter(c => c.category === activeCategory);

  const handleSave = async (config: SiteConfig) => {
    try {
      await upsertMutation.mutateAsync({
        key: config.key,
        value: editValue,
        type: config.type,
        category: config.category,
        description: config.description,
      });
      setEditingKey(null);
      setEditValue('');
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const handleAdd = async () => {
    if (!newConfig.key || !newConfig.value) return;
    
    try {
      let value: any = newConfig.value;
      if (newConfig.type === 'json') {
        value = JSON.parse(newConfig.value);
      } else if (newConfig.type === 'number') {
        value = Number(newConfig.value);
      } else if (newConfig.type === 'boolean') {
        value = newConfig.value === 'true';
      }
      
      await upsertMutation.mutateAsync({
        key: newConfig.key,
        value,
        type: newConfig.type,
        category: newConfig.category,
        description: newConfig.description,
      });
      setShowAddForm(false);
      setNewConfig({ key: '', value: '', type: 'string', category: activeCategory, description: '' });
    } catch (err) {
      console.error('Failed to add:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteKey) return;
    try {
      await deleteMutation.mutateAsync(deleteKey);
      setDeleteKey(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const startEditing = (config: SiteConfig) => {
    setEditingKey(config.key);
    setEditValue(config.value);
  };

  if (isLoading) return <PageLoading />;
  if (error) return <ErrorState message="Failed to load settings" onRetry={refetch} />;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="Manage website configuration and settings"
        action={
          <button
            onClick={() => {
              setNewConfig({ ...newConfig, category: activeCategory });
              setShowAddForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Setting
          </button>
        }
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {filteredConfigs.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No settings in this category yet.
            <button
              onClick={() => setShowAddForm(true)}
              className="block mx-auto mt-4 text-sm text-neutral-900 font-medium hover:underline"
            >
              Add your first setting →
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase">Key</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase">Value</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase">Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredConfigs.map((config) => (
                <tr key={config.key} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <div>
                      <code className="text-sm bg-neutral-100 px-2 py-0.5 rounded">{config.key}</code>
                      {config.description && (
                        <p className="text-xs text-neutral-500 mt-1">{config.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {editingKey === config.key ? (
                      <div className="flex items-center gap-2">
                        {config.type === 'boolean' ? (
                          <select
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="px-3 py-1.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        ) : config.type === 'json' ? (
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                            rows={3}
                          />
                        ) : (
                          <input
                            type={config.type === 'number' ? 'number' : 'text'}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        )}
                        <button
                          onClick={() => handleSave(config)}
                          disabled={upsertMutation.isPending}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingKey(null);
                            setEditValue('');
                          }}
                          className="p-2 bg-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-neutral-700 truncate max-w-xs block">
                        {config.type === 'json' 
                          ? <code className="text-xs">{config.value.substring(0, 50)}...</code>
                          : config.value}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                      {config.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {editingKey !== config.key && (
                        <>
                          <button
                            onClick={() => startEditing(config)}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteKey(config.key)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add New Setting</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Key</label>
                <input
                  type="text"
                  value={newConfig.key}
                  onChange={(e) => setNewConfig({ ...newConfig, key: e.target.value })}
                  placeholder="e.g., site_name"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Value</label>
                {newConfig.type === 'json' ? (
                  <textarea
                    value={newConfig.value}
                    onChange={(e) => setNewConfig({ ...newConfig, value: e.target.value })}
                    placeholder='{"key": "value"}'
                    rows={4}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : newConfig.type === 'boolean' ? (
                  <select
                    value={newConfig.value}
                    onChange={(e) => setNewConfig({ ...newConfig, value: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : (
                  <input
                    type={newConfig.type === 'number' ? 'number' : 'text'}
                    value={newConfig.value}
                    onChange={(e) => setNewConfig({ ...newConfig, value: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                  <select
                    value={newConfig.type}
                    onChange={(e) => setNewConfig({ ...newConfig, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                  <select
                    value={newConfig.category}
                    onChange={(e) => setNewConfig({ ...newConfig, category: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={newConfig.description}
                  onChange={(e) => setNewConfig({ ...newConfig, description: e.target.value })}
                  placeholder="Brief description of this setting"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="p-6 border-t border-neutral-100 flex justify-end gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newConfig.key || !newConfig.value || upsertMutation.isPending}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Setting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteKey}
        title="Delete Setting"
        message={`Are you sure you want to delete "${deleteKey}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteKey(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
